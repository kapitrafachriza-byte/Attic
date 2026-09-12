"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Camera, ShoppingBag, Truck, ShieldCheck, MessageSquare, ArrowRight, X, ChevronRight } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/data/mockData";

export const CircularSteps: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const stepDetails: Record<string, { title: string; subtitle: string; bullets: string[]; note: string }> = {
    "step-sell": {
      title: "Cara Jualan di Attic",
      subtitle: "Foto & pasang harga furniturmu tanpa ribet",
      bullets: [
        "Unggah foto produk furnitur tampak depan, samping, dan belakang.",
        "Cantumkan dimensi fisik (Panjang × Lebar × Tinggi dalam cm).",
        "Deklarasikan lecet/minus secara jujur dengan foto jarak dekat.",
        "0% Biaya Pasang Iklan — Komisi platform hanya jika barang laku."
      ],
      note: "Kurir kargo rekanan Attic akan menjemput langsung dari alamatmu."
    },
    "step-buy": {
      title: "Cara Belanja di Attic",
      subtitle: "Pilih kurasi terbaik dengan informasi dimensi presisi",
      bullets: [
        "Filter berdasarkan ukuran maksimal ruangan dan kota terdekat.",
        "Periksa foto lecet jujur dan lencana kondisi (Mulus, Like New, Vintage).",
        "Cek simulasi ongkir kargo instan langsung di halaman detail produk.",
        "Bayar dengan aman melalui Rekening Bersama (Escrow) Attic."
      ],
      note: "Biaya dipaparkan transparan tanpa ada biaya siluman."
    },
    "step-delivery": {
      title: "Proses Pengiriman Kargo",
      subtitle: "Dijemput dari rumah dan diantar ke pintu hunianmu",
      bullets: [
        "Sistem Attic merekomendasikan jenis armada kargo terbaik (Van / Pikap / Truk).",
        "Tersedia opsi layanan Helper (tenaga angkut) untuk menggotong ke lantai bertingkat.",
        "Pelacakan kurir kargo dari titik penjemputan hingga tiba di tujuan.",
        "SOP inspeksi foto serah terima digital saat barang dinaikkan dan diturunkan."
      ],
      note: "Tersedia opsi add-on deep cleaning sanitasi uap untuk sofa dan kasur."
    },
    "step-safety": {
      title: "100% Aman & Rekber Garansi",
      subtitle: "Garansi uang kembali dengan jendela cek 24 jam",
      bullets: [
        "Dana pembayaranmu aman tersimpan di Rekening Bersama Attic.",
        "Jendela Cek 24 Jam: Periksa kesesuaian fisik barang sejak kurir tiba.",
        "Konfirmasi 'Pesanan Selesai' bila sesuai, atau ajukan sengketa jika ada cacat tersembunyi.",
        "Pengembalian dana 100% jika penjual terbukti tidak jujur mencantumkan cacat parah."
      ],
      note: "Tim Mediasi Sengketa Attic siap menengahi jika ada ketidaksesuaian."
    },
    "step-nego": {
      title: "Nego Harga",
      subtitle: "Tawar langsung seller secara sopan dan teratur",
      bullets: [
        "Kirim penawaran harga terbaik pada barang bertanda 'Bisa Nego'.",
        "Penjual dapat menyetujui, menolak, atau memberikan counter-offer.",
        "Harga checkout otomatis disesuaikan dengan nominal kesepakatan nego.",
        "Semua transaksi tetap aman di dalam proteksi rekber Attic."
      ],
      note: "Chat termoderasi untuk menjaga keamanan transaksi."
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "camera":
        return <Camera className="w-7 h-7 text-[#0060A8] stroke-[1.6]" />;
      case "shoppingBag":
        return <ShoppingBag className="w-7 h-7 text-[#0060A8] stroke-[1.6]" />;
      case "truck":
        return <Truck className="w-7 h-7 text-[#0060A8] stroke-[1.6]" />;
      case "shieldCheck":
        return <ShieldCheck className="w-7 h-7 text-[#0060A8] stroke-[1.6]" />;
      case "messageSquare":
        return <MessageSquare className="w-7 h-7 text-[#0060A8] stroke-[1.6]" />;
      default:
        return <Camera className="w-7 h-7 text-[#0060A8] stroke-[1.6]" />;
    }
  };

  return (
    <section id="cara-pakai" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B192C]">
            Cara pakai Attic
          </h2>
          <Link
            href="#cara-pakai"
            onClick={() => setSelectedStep("step-sell")}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0060A8] hover:underline"
          >
            <span>Panduan Pemula</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5 Steps Circular Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => {
            const isSelected = selectedStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step.id)}
                className={`group flex flex-col items-center text-center cursor-pointer transition-transform hover:-translate-y-1`}
              >
                {/* 72px Uniform Circle */}
                <div
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 transition-all duration-200 border ${
                    isSelected
                      ? "bg-[#E3F0FF] border-[#0060A8] shadow-sm ring-2 ring-[#0060A8]/20"
                      : "bg-[#EFF6FF] border-[#BFDBFE] group-hover:bg-[#E3F0FF] group-hover:border-[#0060A8]"
                  }`}
                >
                  {getIcon(step.icon)}
                </div>

                <h3 className="text-sm font-bold text-[#0B192C] group-hover:text-[#0060A8] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Step Popover / Detail Drawer */}
        {selectedStep && stepDetails[selectedStep] && (
          <div className="mt-8 p-6 bg-[#F8F9FD] border border-slate-200 rounded-3xl max-w-3xl mx-auto relative animate-in fade-in duration-150">
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3">
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
              <div className="pt-2 text-[11px] text-slate-500 italic">
                💡 {stepDetails[selectedStep].note}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
