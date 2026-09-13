"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Phone, MapPin, Building, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SellerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationSuccess: () => void;
}

export const SellerVerificationModal: React.FC<SellerVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationSuccess,
}) => {
  const { user, verifyAsSeller } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(user?.emailOrPhone || "081298765432");
  const [city, setCity] = useState("Jakarta Selatan");
  const [address, setAddress] = useState("");
  const [bankName, setBankName] = useState("BCA");
  const [bankAccount, setBankAccount] = useState("");
  const [accountHolder, setAccountHolder] = useState(user?.name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !address || !bankAccount || !accountHolder) {
      alert("Harap lengkapi semua data verifikasi penjual!");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyAsSeller({
        phone: phoneNumber,
        address: `${address}, ${city}`,
        bankAccount: `${bankName} - ${bankAccount} a.n ${accountHolder}`,
      });
      alert("Selamat! Akun Anda telah berhasil diverifikasi sebagai Penjual Attic. Anda sekarang dapat mulai menayangkan iklan furnitur.");
      onVerificationSuccess();
    } catch {
      alert("Gagal melakukan verifikasi penjual. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0060A8] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#0B192C]">
                Verifikasi Penjual Attic
              </h3>
              <p className="text-[11px] text-slate-500">
                Wajib 1× sebelum menayangkan iklan perdana
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-900 leading-relaxed space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" /> Standar Kepercayaan & Penjemputan
            </p>
            <p className="text-[11px] text-slate-600">
              Data ini digunakan tim kurir kargo untuk konfirmasi jadwal penjemputan dan pencairan dana hasil penjualan secara langsung ke rekening bank Anda.
            </p>
          </div>

          {/* Section 1: Phone */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-500" /> Nomor WhatsApp Aktif Penjual
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Contoh: 081298765432"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0060A8]"
              required
            />
          </div>

          {/* Section 2: Address */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Alamat Lokasi Penjemputan (Jabodetabek)
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0060A8] mb-2"
            >
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Timur">Jakarta Timur</option>
              <option value="Jakarta Utara">Jakarta Utara</option>
              <option value="Tangerang">Tangerang</option>
              <option value="Tangerang Selatan / BSD">Tangerang Selatan / BSD</option>
              <option value="Depok">Depok</option>
              <option value="Bekasi">Bekasi</option>
              <option value="Bogor">Bogor</option>
            </select>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nama jalan, nomor rumah/nama apartemen, RT/RW, kelurahan, dan patokan jalan..."
              rows={2}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0060A8]"
              required
            />
          </div>

          {/* Section 3: Bank Account */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-500" /> Rekening Bank Pencairan Dana
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="col-span-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              >
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BRI">BRI</option>
                <option value="BNI">BNI</option>
                <option value="CIMB">CIMB Niaga</option>
                <option value="Jago">Bank Jago</option>
              </select>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="Nomor Rekening"
                className="col-span-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0060A8]"
                required
              />
            </div>
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Nama Pemilik Rekening (Sesuai Buku Tabungan)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0060A8]"
              required
            />
          </div>

          {/* Footer CTA */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#0B192C] hover:bg-[#1A2E4B] disabled:bg-slate-400 text-white font-bold text-xs rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isSubmitting ? "Memverifikasi..." : "Verifikasi & Buka Akses Jualan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
