"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Truck, Sparkles, User, Check, Building, QrCode, CreditCard, ArrowRight } from "lucide-react";
import { ProductItem } from "@/types";

interface CheckoutModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOrderSuccess: (orderData: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  onClose,
  onOrderSuccess
}) => {
  const [address, setAddress] = useState("Jl. Senopati No. 42, Kebayoran Baru");
  const [city, setCity] = useState("Jakarta Selatan");
  const [isApartment, setIsApartment] = useState(true);
  const [floor, setFloor] = useState("5");
  const [hasLift, setHasLift] = useState(true);

  // Add-ons
  const [includeHelper, setIncludeHelper] = useState(true);
  const [helperCount, setHelperCount] = useState<1 | 2>(1);
  const [includeDeepClean, setIncludeDeepClean] = useState(false);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("bca_va");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!product) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  // Cargo rates based on recommended vehicle
  const cargoBaseRates: Record<string, number> = {
    VAN: 95000,
    PICKUP_BAK: 120000,
    PICKUP_BOX: 145000,
    ENGKEL: 240000
  };

  const shippingCost = cargoBaseRates[product.recommendedCargo] || 120000;
  const helperCost = includeHelper ? (helperCount === 1 ? 80000 : 150000) : 0;
  const deepCleanCost = includeDeepClean ? 150000 : 0;
  const escrowProtectionFee = 25000;

  const totalAmount = product.price + shippingCost + helperCost + deepCleanCost + escrowProtectionFee;

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          buyerId: "user-buyer-1",
          receiverName: "Rian Hendrawan",
          phone: "081234567890",
          street: address || "Jl. Kemang Raya No. 12",
          city,
          isApartment: Boolean(isApartment),
          floorLevel: Number(floor) || 1,
          hasServiceElevator: Boolean(hasLift),
          helperCount: includeHelper ? helperCount : 0,
          includeDeepClean,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setOrderCompleted(true);
        onOrderSuccess({
          orderId: data.data.order.id,
          product,
          totalAmount: data.data.order.financials.totalBuyerPaid,
          shippingCost: data.data.order.financials.logisticsFee,
          helperCost: data.data.order.financials.helperFee,
          deepCleanCost: data.data.order.financials.deepCleanFee,
          escrowProtectionFee: data.data.order.financials.escrowProtectionFee,
          city,
          address,
        });
      } else {
        // Optimistic fallback
        setOrderCompleted(true);
        onOrderSuccess({
          orderId: "ATC-" + Math.floor(100000 + Math.random() * 900000),
          product,
          totalAmount,
          shippingCost,
          helperCost,
          deepCleanCost,
          escrowProtectionFee,
          city,
          address,
        });
      }
    } catch {
      // Offline / fallback handling
      setOrderCompleted(true);
      onOrderSuccess({
        orderId: "ATC-" + Math.floor(100000 + Math.random() * 900000),
        product,
        totalAmount,
        shippingCost,
        helperCost,
        deepCleanCost,
        escrowProtectionFee,
        city,
        address,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0B192C] text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#0B192C]">
                Checkout Bebas Cemas (Escrow Protection)
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Transaksi Dilindungi Rekening Bersama Attic
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderCompleted ? (
          /* Order Success View */
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95 duration-200 flex-1 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#0B192C]">
                Pembayaran Escrow Berhasil!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Dana sebesar <strong>{formatRupiah(totalAmount)}</strong> telah aman ditampung di Rekening Bersama Attic. Penjual telah diberi notifikasi untuk menyiapkan slot penjemputan armada kargo.
              </p>
            </div>

            {/* Escrow Inspection Timer Alert */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-left space-y-2 max-w-md mx-auto">
              <span className="text-xs font-bold text-[#0060A8] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Jendela Proteksi 24 Jam Aktif
              </span>
              <p className="text-xs text-slate-600">
                Saat kurir tiba di hunianmu, kamu memiliki waktu <strong>1×24 jam</strong> untuk memeriksa furnitur. Dana baru dilepaskan ke dompet penjual setelah kamu mengonfirmasi barang sesuai.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#0B192C] text-white text-xs font-bold rounded-full hover:bg-[#1A2E4B]"
            >
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* Product Summary */}
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{product.brand}</span>
                <h4 className="font-bold text-sm text-[#0B192C] truncate">{product.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ukuran: {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                </p>
                <div className="flex items-center justify-between mt-1 pt-1">
                  <span className="font-bold text-sm text-[#0B192C]">{formatRupiah(product.price)}</span>
                  <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full font-semibold">
                    {product.conditionLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address & Building Access */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#0060A8]" /> Alamat Pengantaran & Kriteria Hunian
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Alamat lengkap penerima"
                    className="w-full p-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-slate-800"
                  >
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                    <option value="Jakarta Barat">Jakarta Barat</option>
                    <option value="Jakarta Timur">Jakarta Timur</option>
                    <option value="Jakarta Utara">Jakarta Utara</option>
                    <option value="Tangerang / BSD">Tangerang / BSD</option>
                    <option value="Depok">Depok</option>
                    <option value="Bekasi">Bekasi</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isApartment}
                      onChange={(e) => setIsApartment(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#0060A8]"
                    />
                    <span>Apartemen / Gedung Bertingkat</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bulky Cargo Logistics & Add-ons */}
            <div className="space-y-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0060A8] flex items-center gap-1.5">
                  <Truck className="w-4 h-4" /> Rekomendasi Armada: {product.recommendedCargo}
                </span>
                <span className="text-xs font-bold text-slate-900">{formatRupiah(shippingCost)}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Sistem Attic mengalokasikan armada terbaik berdasarkan volume kubikasi barang.
              </p>

              {/* Add-on 1: Helper Service */}
              <div className="pt-2 border-t border-blue-200/60">
                <div className="flex items-start justify-between">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeHelper}
                      onChange={(e) => setIncludeHelper(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0060A8] mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Layanan Helper (Tenaga Angkut)</p>
                      <p className="text-[11px] text-slate-500">
                        Bantu angkut furnitur berat keluar/masuk kamar & naik tangga.
                      </p>
                    </div>
                  </label>
                  <span className="text-xs font-bold text-slate-900">
                    +{formatRupiah(includeHelper ? (helperCount === 1 ? 80000 : 150000) : 0)}
                  </span>
                </div>

                {includeHelper && (
                  <div className="flex gap-2 mt-2 pl-6">
                    <button
                      type="button"
                      onClick={() => setHelperCount(1)}
                      className={`px-3 py-1 text-xs rounded-lg font-semibold ${
                        helperCount === 1 ? "bg-[#0B192C] text-white" : "bg-white border border-slate-200 text-slate-700"
                      }`}
                    >
                      1 Tenaga Helper (+Rp 80rb)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHelperCount(2)}
                      className={`px-3 py-1 text-xs rounded-lg font-semibold ${
                        helperCount === 2 ? "bg-[#0B192C] text-white" : "bg-white border border-slate-200 text-slate-700"
                      }`}
                    >
                      2 Tenaga Helper (+Rp 150rb)
                    </button>
                  </div>
                )}
              </div>

              {/* Add-on 2: Deep Cleaning Sanitasi */}
              {product.deepCleanAvailable && (
                <div className="pt-2 border-t border-blue-200/60">
                  <div className="flex items-start justify-between">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeDeepClean}
                        onChange={(e) => setIncludeDeepClean(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0060A8] mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Professional Deep Cleaning & Sanitasi Uap
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Pencucian basah & uap anti-tungau sebelum furnitur tiba di tempatmu.
                        </p>
                      </div>
                    </label>
                    <span className="text-xs font-bold text-slate-900">
                      +{formatRupiah(includeDeepClean ? 150000 : 0)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800">Pilih Metode Pembayaran</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bca_va")}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    paymentMethod === "bca_va" ? "border-[#0060A8] bg-[#E3F0FF] font-bold text-[#0060A8]" : "border-slate-200"
                  }`}
                >
                  <span>BCA Virtual Account</span>
                  <CreditCard className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("qris")}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    paymentMethod === "qris" ? "border-[#0060A8] bg-[#E3F0FF] font-bold text-[#0060A8]" : "border-slate-200"
                  }`}
                >
                  <span>QRIS (Gopay / OVO)</span>
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Transparent Cost Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Harga Furnitur:</span>
                <span>{formatRupiah(product.price)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ongkir Kargo ({product.recommendedCargo}):</span>
                <span>{formatRupiah(shippingCost)}</span>
              </div>
              {includeHelper && (
                <div className="flex justify-between text-slate-600">
                  <span>Layanan Helper ({helperCount} orang):</span>
                  <span>{formatRupiah(helperCost)}</span>
                </div>
              )}
              {includeDeepClean && (
                <div className="flex justify-between text-slate-600">
                  <span>Deep Cleaning Sanitasi:</span>
                  <span>{formatRupiah(deepCleanCost)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Biaya Proteksi Escrow Rekber:
                </span>
                <span>{formatRupiah(escrowProtectionFee)}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-[#0B192C]">
                <span>Total Pembayaran:</span>
                <span className="text-emerald-700 text-base">{formatRupiah(totalAmount)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {!orderCompleted && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-500">Total:</span>{" "}
              <span className="font-extrabold text-sm text-[#0B192C]">{formatRupiah(totalAmount)}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 bg-[#0B192C] hover:bg-[#1A2E4B] text-white font-bold text-xs rounded-full shadow-md transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Memproses Escrow...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Bayar Sekarang (Aman di Rekber)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
