"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Truck, Clock, AlertTriangle, CheckCircle, MapPin, Upload, MessageSquare } from "lucide-react";

interface OrderTrackingModalProps {
  order: any;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  const [activeTab, setActiveTab] = useState<"tracking" | "dispute">("tracking");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDisputeSubmitted, setIsDisputeSubmitted] = useState(false);
  const [disputeReason, setDisputeReason] = useState("DEFECT_NOT_DISCLOSED");
  const [disputeDescription, setDisputeDescription] = useState("");
  const [disputeProofUploaded, setDisputeProofUploaded] = useState(false);

  if (!order) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCompleteOrder = () => {
    setIsCompleted(true);
  };

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeDescription) {
      alert("Harap jelaskan ketidaksesuaian kondisi barang");
      return;
    }
    setIsDisputeSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Status Pesanan • No. {order.orderId}
            </span>
            <h3 className="font-extrabold text-base text-[#0B192C]">
              Pelacakan Kargo & Proteksi Escrow 24 Jam
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Order Snapshot */}
          <div className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-slate-200 flex items-center gap-3">
            <img
              src={order.product?.imageUrl}
              alt="Item"
              className="w-14 h-14 rounded-xl object-cover border border-slate-200"
            />
            <div className="flex-1 min-w-0 text-xs">
              <h4 className="font-bold text-slate-900 truncate">{order.product?.title}</h4>
              <p className="text-slate-500">Tujuan: {order.city}</p>
              <p className="font-bold text-[#0B192C]">{formatRupiah(order.totalAmount)}</p>
            </div>
          </div>

          {/* 24-HOUR ESCROW PROTECTED BANNER */}
          {isCompleted ? (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h4 className="font-bold text-sm text-emerald-900">Pesanan Telah Selesai!</h4>
              <p className="text-xs text-emerald-800">
                Terima kasih! Dana escrow sebesar <strong>{formatRupiah(order.product.price)}</strong> telah diteruskan ke dompet saldo penjual.
              </p>
            </div>
          ) : isDisputeSubmitted ? (
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Tiket Sengketa Berhasil Diajukan</span>
              </div>
              <p className="text-xs text-amber-950">
                Dana escrow sebesar <strong>{formatRupiah(order.totalAmount)}</strong> telah <strong>DIBEKUKAN SEMENTARA</strong>. Tim Mediasi CS Attic akan memeriksa bukti foto dalam 1×24 jam untuk solusi pengembalian dana atau retur barang.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0060A8] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#1E88E5]" /> Jendela Evaluasi 24 Jam Sedang Berjalan
                </span>
                <span className="text-xs font-extrabold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                  Sisa 23:42:15
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Barang telah diserahkan oleh kurir kargo. Kamu memiliki 24 jam untuk memeriksa kondisi fisik dan kesesuaian barang sebelum dana dicairkan ke penjual.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleCompleteOrder}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Pesanan Sesuai (Lepas Dana)</span>
                </button>
                <button
                  onClick={() => setActiveTab("dispute")}
                  className="px-3 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  Ajukan Komplain
                </button>
              </div>
            </div>
          )}

          {/* DISPUTE FORM */}
          {activeTab === "dispute" && !isDisputeSubmitted && !isCompleted && (
            <form onSubmit={handleDisputeSubmit} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#0B192C]">Formulir Klaim Sengketa Barang</h4>
                <button
                  type="button"
                  onClick={() => setActiveTab("tracking")}
                  className="text-[11px] text-slate-500 hover:text-slate-800"
                >
                  Batal
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Alasan Sengketa</label>
                <select
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                >
                  <option value="DEFECT_NOT_DISCLOSED">Terdapat cacat/lecet parah yang tidak dicantumkan penjual</option>
                  <option value="DAMAGE_IN_TRANSIT">Barang rusak atau patah selama perjalanan kargo</option>
                  <option value="WRONG_DIMENSIONS">Ukuran fisik tidak sesuai spesifikasi</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Rincian Keluhan</label>
                <textarea
                  rows={2}
                  placeholder="Jelaskan detail ketidaksesuaian barang..."
                  value={disputeDescription}
                  onChange={(e) => setDisputeDescription(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div
                onClick={() => setDisputeProofUploaded(!disputeProofUploaded)}
                className={`p-3 border-2 border-dashed rounded-xl text-center cursor-pointer text-xs ${
                  disputeProofUploaded ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold" : "border-slate-300 bg-white text-slate-600"
                }`}
              >
                <Upload className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                <span>{disputeProofUploaded ? "✓ Foto Bukti Cacat Terunggah" : "Unggah Foto Bukti Cacat / Unboxing"}</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Kirim Laporan Sengketa & Bekukan Escrow
              </button>
            </form>
          )}

          {/* Delivery Milestone Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Riwayat Milestone Kargo
            </h4>
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Barang Tiba di Alamat Pembeli</p>
                  <p className="text-[11px] text-slate-500">Helper membantu angkut ke dalam unit lantai {order.floor || "3"}</p>
                  <span className="text-[10px] text-slate-400">Hari ini, 14:15 WIB</span>
                </div>
              </div>

              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Kurir Kargo Menjemput di Penjual</p>
                  <p className="text-[11px] text-slate-500">SOP inspeksi kilat & foto bukti muat selesai</p>
                  <span className="text-[10px] text-slate-400">Hari ini, 11:30 WIB</span>
                </div>
              </div>

              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Pembayaran Escrow Diterima</p>
                  <p className="text-[11px] text-slate-500">Dana aman di rekening penampung bersama</p>
                  <span className="text-[10px] text-slate-400">Hari ini, 09:00 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B192C] text-white text-xs font-semibold rounded-full"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
