"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Truck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Ruler, 
  ArrowLeft, 
  Eye, 
  Sparkles, 
  Building, 
  Phone, 
  ExternalLink,
  RotateCcw
} from "lucide-react";
import { AtticLogo } from "@/components/common/AtticLogo";
import { 
  MOCK_PENDING_LISTINGS, 
  MOCK_DISPUTES, 
  MOCK_SHIPMENTS, 
  PendingListing, 
  DisputeTicket 
} from "@/data/adminMockData";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"moderation" | "disputes" | "shipments">("moderation");
  const [listings, setListings] = useState<PendingListing[]>(MOCK_PENDING_LISTINGS);
  const [disputes, setDisputes] = useState<DisputeTicket[]>(MOCK_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState<DisputeTicket | null>(disputes[0]);
  const [inspectListing, setInspectListing] = useState<PendingListing | null>(null);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [listingsRes, disputesRes] = await Promise.all([
          fetch("/api/admin/listings"),
          fetch("/api/disputes"),
        ]);
        const listingsJson = await listingsRes.json();
        const disputesJson = await disputesRes.json();
        if (listingsJson.success && listingsJson.data?.length) {
          setListings(listingsJson.data);
        }
        if (disputesJson.success && disputesJson.data?.length) {
          setDisputes(disputesJson.data);
          setSelectedDispute(disputesJson.data[0]);
        }
      } catch (err) {
        // Fallback to initial mock data silently
      }
    }
    loadAdminData();
  }, []);

  // Moderation Actions
  const handleApproveListing = async (id: string) => {
    try {
      await fetch(`/api/admin/listings/${id}/moderate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED" }),
      });
    } catch {
      // Fallback locally
    }
    setListings(listings.map((l) => (l.id === id ? { ...l, status: "APPROVED" } : l)));
    alert(`Iklan ${id} telah disetujui dan langsung tayang publik di marketplace!`);
  };

  const handleRequestRevision = async (id: string) => {
    try {
      await fetch(`/api/admin/listings/${id}/moderate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "NEEDS_REVISION" }),
      });
    } catch {
      // Fallback locally
    }
    setListings(listings.map((l) => (l.id === id ? { ...l, status: "NEEDS_REVISION" } : l)));
    alert(`Notifikasi telah dikirim ke penjual untuk melampirkan foto makro lecet yang lebih jelas.`);
  };

  const handleRejectListing = async (id: string) => {
    try {
      await fetch(`/api/admin/listings/${id}/moderate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      });
    } catch {
      // Fallback locally
    }
    setListings(listings.map((l) => (l.id === id ? { ...l, status: "REJECTED" } : l)));
    alert(`Iklan ${id} ditolak karena tidak memenuhi standar kurasi Attic.`);
  };

  // Dispute Arbitrations
  const handleResolveRefund = async (id: string) => {
    try {
      await fetch(`/api/admin/disputes/${id}/arbitrate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "FULL_REFUND_BUYER" }),
      });
    } catch {
      // Fallback locally
    }
    setDisputes(disputes.map((d) => (d.id === id ? { ...d, status: "REFUNDED" } : d)));
    alert(`Putusan Arbitrase: Sengketa ${id} selesai. Dana 100% dikembalikan ke rekening pembeli, kurir retur dijadwalkan.`);
    setSelectedDispute(null);
  };

  const handleResolveReleaseToSeller = async (id: string) => {
    try {
      await fetch(`/api/admin/disputes/${id}/arbitrate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "RELEASE_TO_SELLER" }),
      });
    } catch {
      // Fallback locally
    }
    setDisputes(disputes.map((d) => (d.id === id ? { ...d, status: "RELEASED_TO_SELLER" } : d)));
    alert(`Putusan Arbitrase: Komplain ditolak karena cacat sudah tercantum di iklan awal. Dana escrow dilepas ke saldo penjual.`);
    setSelectedDispute(null);
  };

  const handleResolvePartial = async (id: string) => {
    try {
      await fetch(`/api/admin/disputes/${id}/arbitrate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "PARTIAL_COMPENSATION", partialAmount: 350000 }),
      });
    } catch {
      // Fallback locally
    }
    setDisputes(disputes.map((d) => (d.id === id ? { ...d, status: "PARTIAL_COMPENSATION" } : d)));
    alert(`Putusan Arbitrase: Kompensasi servis disetujui (Rp 350.000 ditransfer ke pembeli, sisa dana dicairkan ke penjual).`);
    setSelectedDispute(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AtticLogo size="sm" />
            <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-[#0B192C]">
                Admin Operations & Dispute Desk
              </h1>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                Pusat Kurasi Iklan, Mediasi Sengketa Escrow, & Logistik Kargo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0060A8] border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" /> Superadmin
            </span>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-black px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ke Marketplace</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Saldo Escrow Tertahan</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-xl font-extrabold text-[#0B192C] mt-2">Rp 48.250.000</p>
            <p className="text-[11px] text-slate-500 mt-0.5">18 transaksi menunggu inspeksi 24 jam</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Antrean Moderasi</span>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            </div>
            <p className="text-xl font-extrabold text-[#0B192C] mt-2">{listings.filter(l => l.status === "PENDING").length} Iklan Baru</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Wajib periksa foto lecet jujur</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Sengketa Terbuka</span>
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            </div>
            <p className="text-xl font-extrabold text-rose-600 mt-2">{disputes.filter(d => d.status === "OPEN").length} Tiket</p>
            <p className="text-[11px] text-slate-500 mt-0.5">SLA mediasi &lt; 24 jam</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Armada Kargo Aktif</span>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            </div>
            <p className="text-xl font-extrabold text-[#0060A8] mt-2">{MOCK_SHIPMENTS.length} Unit</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Penjemputan Jabodetabek</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 flex items-center gap-3">
          <button
            onClick={() => setActiveTab("moderation")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "moderation"
                ? "border-[#0B192C] text-[#0B192C]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Antrean Moderasi Iklan ({listings.filter(l => l.status === "PENDING").length})
          </button>
          <button
            onClick={() => setActiveTab("disputes")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "disputes"
                ? "border-[#0B192C] text-[#0B192C]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Pusat Mediasi Sengketa ({disputes.filter(d => d.status === "OPEN").length})
          </button>
          <button
            onClick={() => setActiveTab("shipments")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "shipments"
                ? "border-[#0B192C] text-[#0B192C]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Monitoring Kargo & Escrow Live
          </button>
        </div>

        {/* TAB 1: LISTING MODERATION QUEUE */}
        {activeTab === "moderation" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0B192C]">
                  Daftar Pengajuan Iklan Furnitur Baru
                </h2>
                <p className="text-xs text-slate-500">
                  Standar Attic: Pastikan barang selain Like New memiliki foto close-up lecet/minus yang jelas.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs divide-y divide-slate-100">
              {listings.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">{item.id}</span>
                        <span className="text-xs font-semibold text-slate-600">• {item.category}</span>
                        <span className="text-[10px] text-slate-400">Diajukan {item.submittedAt}</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#0B192C] truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600">
                        Penjual: <strong>{item.sellerName}</strong> • Harga: <strong>{formatRupiah(item.price)}</strong>
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[11px]">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                          {item.conditionTier}
                        </span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-slate-400" />
                          {item.dimensions.length}×{item.dimensions.width}×{item.dimensions.height} cm
                        </span>
                        {item.flawInfo.hasFlaws && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                            ⚠️ {item.flawInfo.flawImages.length} Foto Lecet Terlampir
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Status */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {item.status === "PENDING" ? (
                      <>
                        <button
                          onClick={() => setInspectListing(item)}
                          className="px-3 py-1.5 bg-[#F8F9FD] hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1 border border-slate-200"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Periksa Lecet</span>
                        </button>
                        <button
                          onClick={() => handleRequestRevision(item.id)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200"
                        >
                          Minta Revisi
                        </button>
                        <button
                          onClick={() => handleApproveListing(item.id)}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                        >
                          Setujui
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === "APPROVED" ? "bg-emerald-100 text-emerald-800" :
                        item.status === "NEEDS_REVISION" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                      }`}>
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DISPUTE RESOLUTION DESK */}
        {activeTab === "disputes" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-[#0B192C]">
                Pusat Mediasi Sengketa Pembeli vs Penjual (Jendela 24 Jam)
              </h2>
              <p className="text-xs text-slate-500">
                Bandingkan foto kondisi barang pada iklan awal dengan foto bukti kerusakan dari pembeli sebelum menetapkan putusan dana escrow.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Ticket List */}
              <div className="lg:col-span-5 space-y-3">
                {disputes.map((d) => {
                  const isSelected = selectedDispute?.id === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDispute(d)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-white border-[#0060A8] ring-2 ring-[#0060A8]/20 shadow-sm"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0B192C]">{d.id}</span>
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Sisa {d.remainingTime}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1 truncate">
                        {d.productTitle}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Pembeli: {d.buyerName} • Penjual: {d.sellerName}
                      </p>
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-xs">
                        <span className="text-slate-500">Dana Dibekukan:</span>
                        <span className="font-extrabold text-[#0B192C]">{formatRupiah(d.totalEscrowAmount)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Side-by-Side Dispute Comparison Panel */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-5">
                {selectedDispute ? (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-slate-400">Tiket Mediasi: {selectedDispute.id}</span>
                        <h3 className="font-bold text-base text-[#0B192C]">{selectedDispute.productTitle}</h3>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
                        Alasan: {selectedDispute.reason}
                      </span>
                    </div>

                    {/* Complaint Description */}
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                      <span className="text-[11px] font-bold text-rose-900 uppercase">Keluhan Pembeli:</span>
                      <p className="text-xs text-rose-950 leading-relaxed">{selectedDispute.description}</p>
                    </div>

                    {/* Photo Side-by-Side Comparison */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                        Perbandingan Bukti Visual
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-slate-500">1. Foto Iklan Penjual:</span>
                          <div className="aspect-4/3 rounded-xl overflow-hidden border border-slate-200 relative">
                            <img src={selectedDispute.listingPhoto} alt="Listing" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-rose-600">2. Foto Bukti Unboxing Pembeli:</span>
                          <div className="aspect-4/3 rounded-xl overflow-hidden border-2 border-rose-300 relative">
                            <img src={selectedDispute.buyerProofPhoto} alt="Buyer proof" className="w-full h-full object-cover" />
                            <span className="absolute top-1 left-1 text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded">Cacat Dilaporkan</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decision Actions */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-xs font-bold text-slate-800">Tentukan Putusan Arbitrase Attic:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <button
                          onClick={() => handleResolveRefund(selectedDispute.id)}
                          className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs transition-colors text-center"
                        >
                          Refund 100% (Retur Barang)
                        </button>
                        <button
                          onClick={() => handleResolvePartial(selectedDispute.id)}
                          className="p-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-xs transition-colors text-center"
                        >
                          Kompensasi Servis (Rp 350rb)
                        </button>
                        <button
                          onClick={() => handleResolveReleaseToSeller(selectedDispute.id)}
                          className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors text-center"
                        >
                          Tolak & Cairkan ke Penjual
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-slate-400">
                    Pilih salah satu tiket sengketa di sisi kiri untuk melihat perbandingan bukti.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE CARGO SHIPMENTS */}
        {activeTab === "shipments" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-[#0B192C]">
                Pemantauan Armada Kargo & Helper Jabodetabek
              </h2>
              <p className="text-xs text-slate-500">
                Status kurir penjemputan dari rumah penjual dan pengantaran ke hunian bertingkat pembeli secara real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_SHIPMENTS.map((ship) => (
                <div key={ship.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#0060A8]" />
                      {ship.vehicleType}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0060A8]">
                      {ship.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <span className="font-bold text-slate-800">Dari:</span>
                      <span className="truncate">{ship.origin}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="font-bold text-slate-800">Ke:</span>
                      <span className="truncate">{ship.destination}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 pt-1">
                      <Building className="w-3.5 h-3.5" />
                      <span>Tenaga Helper: <strong>{ship.helperCount} orang</strong></span>
                    </div>
                    {ship.deepCleanIncluded && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-emerald-500" /> Melalui Sentra Deep Cleaning
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{ship.driverName}</p>
                      <p className="text-[11px] text-slate-400">{ship.driverPhone}</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#0060A8]">{ship.estimatedArrival}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inspect Flaw Modal */}
        {inspectListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#0B192C]">Pemeriksaan Foto Cacat Iklan {inspectListing.id}</h3>
                <button onClick={() => setInspectListing(null)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700">Deskripsi Minus dari Penjual:</span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {inspectListing.flawInfo.description || "Tidak ada deskripsi lecet"}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-700 mb-1 block">Foto Close-up Area Minus:</span>
                {inspectListing.flawInfo.flawImages.length > 0 ? (
                  <div className="aspect-4/3 rounded-xl overflow-hidden border-2 border-amber-300">
                    <img src={inspectListing.flawInfo.flawImages[0]} alt="Inspect flaw" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 p-4 text-center bg-slate-50 rounded-xl">Penjual tidak mengunggah foto lecet (Kondisi Like New dinyatakan).</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    handleApproveListing(inspectListing.id);
                    setInspectListing(null);
                  }}
                  className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Foto Sesuai & Setujui Iklan
                </button>
                <button
                  onClick={() => {
                    handleRequestRevision(inspectListing.id);
                    setInspectListing(null);
                  }}
                  className="px-4 py-2 bg-amber-100 text-amber-900 text-xs font-bold rounded-xl"
                >
                  Minta Foto Ulang
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
