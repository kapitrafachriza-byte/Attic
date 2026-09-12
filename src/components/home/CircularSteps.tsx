"use client";

import React, { useState } from "react";
import { Camera, ShoppingBag, Truck, ShieldCheck, MessageSquare, ChevronRight, X } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/data/mockData";

export const CircularSteps: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const stepDetails: Record<string, { title: string; subtitle: string; bullets: string[]; note: string }> = {
    "step-sell": {
      title: "Cara Jualan di Attic",
      subtitle: "Jual furnitur tak terpakai tanpa repot angkut sendiri",
      bullets: [
        "Unggah foto jelas tampak depan, samping, dan belakang.",
        "Wajib foto close-up area lecet/cacat agar pembeli tahu kondisi sebenarnya.",
        "Isi dimensi fisik presisi (Panjang × Lebar × Tinggi dalam cm) dan kriteria akses hunian (lantai/lift).",
        "0% Biaya Pasang Iklan — Komisi platform hanya dipotong jika barang berhasil laku."
      ],
      note: "Kurir kargo mitra Attic akan menjemput langsung ke dalam unit apartemen atau rumahmu."
    },
    "step-buy": {
      title: "Cara Belanja Furnitur",
      subtitle: "Beli perabot idaman dengan informasi ukuran & kondisi yang transparan",
      bullets: [
        "Filter berdasarkan ukuran maksimal ruanganmu (misal panjang sofa maksimal 180cm).",
        "Periksa foto lecet jujur dan lencana kondisi (Like New / Gently Loved / Vintage).",
        "Lihat simulasi ongkos kirim kargo instan langsung di halaman produk sebelum checkout.",
        "Pilih metode pembayaran aman (Virtual Account, QRIS, Kartu Kredit)."
      ],
      note: "Tidak ada biaya siluman — rincian barang, ongkir, dan proteksi dipaparkan transparan."
    },
    "step-delivery": {
      title: "Proses Pengiriman Kargo & Helper",
      subtitle: "Armada kargo on-demand siap bawa muatan besar ke hunian bertingkat",
      bullets: [
        "Sistem otomatis merekomendasikan armada terhemat (Van, Pikap Bak, Pikap Box, Truk Engkel).",
        "Tersedia opsi layanan Helper (tenaga angkut) untuk menggotong furnitur naik tangga/lift apartemen.",
        "Pelacakan kurir kargo secara transparan dari lokasi penjemputan hingga tiba di rumahmu.",
        "SOP kurir: foto kondisi sebelum muat dan serah terima digital saat tiba."
      ],
      note: "Khusus sofa dan kasur, tersedia add-on Professional Deep Cleaning agar tiba dalam kondisi higienis."
    },
    "step-safety": {
      title: "Jaminan Keamanan 100% (Escrow 24 Jam)",
      subtitle: "Transaksi bebas cemas penipuan dan barang tidak sesuai",
      bullets: [
        "Uang pembayaranmu aman ditampung di Rekening Bersama (Escrow Vault) Attic.",
        "Jendela Cek 24 Jam: Pembeli punya waktu 1×24 jam sejak kurir tiba untuk memeriksa barang.",
        "Jika kondisi sesuai, konfirmasi 'Pesanan Selesai' dan dana baru dicairkan ke saldo penjual.",
        "Jika ada cacat parah tersembunyi yang tidak tertulis, ajukan sengketa untuk pengembalian dana 100%."
      ],
      note: "Tim Mediasi Sengketa Attic siap menengahi jika ada ketidaksesuaian barang."
    },
    "step-nego": {
      title: "Fitur Tawar-Menawar (Bisa Nego)",
      subtitle: "Diskusikan harga terbaik secara sopan dan teratur",
      bullets: [
        "Lihat badge 'Bisa Nego' pada produk yang mengizinkan penawaran.",
        "Kirim penawaran wajar (maksimal diskon 20% dari harga buka listing).",
        "Penjual dapat menyetujui, menolak, atau memberikan tawaran balik (counter-offer).",
        "Begitu disetujui, harga checkout otomatis disesuaikan dengan nominal kesepakatan."
      ],
      note: "Chat termoderasi dengan proteksi nomor kontak agar transaksi tetap terlindungi rekber Attic."
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "camera":
        return <Camera className="w-6 h-6 text-[#0060A8]" />;
      case "shoppingBag":
        return <ShoppingBag className="w-6 h-6 text-[#0060A8]" />;
      case "truck":
        return <Truck className="w-6 h-6 text-[#0060A8]" />;
      case "shieldCheck":
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case "messageSquare":
        return <MessageSquare className="w-6 h-6 text-[#0060A8]" />;
      default:
        return <Camera className="w-6 h-6 text-[#0060A8]" />;
    }
  };

  return (
    <section id="cara-pakai" className="py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B192C]">
            Cara Pakai Attic
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Alur transaksi furnitur preloved yang praktis, transparan, dan bebas repot
          </p>
        </div>

        {/* 5 Circular Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6">
          {HOW_IT_WORKS_STEPS.map((step) => {
            const isSelected = selectedStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setSelectedStep(step.id)}
                className={`group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#EFF4FC] ring-2 ring-[#0060A8]/30 shadow-xs"
                    : "hover:bg-[#F8F9FD]"
                }`}
              >
                {/* 64px Uniform Circle */}
                <div className="relative mb-3">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      step.id === "step-safety"
                        ? "border-emerald-200 bg-emerald-50 group-hover:border-emerald-400 group-hover:bg-emerald-100"
                        : "border-slate-200 bg-[#F8F9FD] group-hover:border-[#0060A8]/40 group-hover:bg-[#E3F0FF]"
                    }`}
                  >
                    {getIcon(step.icon)}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0B192C] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {step.stepNumber}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#0B192C] group-hover:text-[#0060A8] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">
                  {step.desc}
                </p>

                <span className="mt-2 text-[10px] font-semibold text-[#0060A8] bg-[#E3F0FF] px-2 py-0.5 rounded-full">
                  {step.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail Expansion Modal / Banner */}
        {selectedStep && stepDetails[selectedStep] && (
          <div className="mt-8 p-5 bg-[#F8F9FD] border border-slate-200 rounded-2xl max-w-3xl mx-auto relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0B192C] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                ✓
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#0B192C]">
                  {stepDetails[selectedStep].title}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {stepDetails[selectedStep].subtitle}
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  {stepDetails[selectedStep].bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#0060A8] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                  💡 {stepDetails[selectedStep].note}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
