"use client";

import React from "react";
import { ShieldCheck, Truck, ShieldAlert, Recycle } from "lucide-react";

export const ValuePillars: React.FC = () => {
  const pillars = [
    {
      title: "Kurasi Terpercaya",
      desc: "Setiap furnitur preloved diverifikasi kondisi, dimensi fisik, dan keasliannya sebelum tayang.",
      icon: ShieldCheck,
    },
    {
      title: "Pengiriman Aman",
      desc: "Mitra logistik spesialis furnitur bergaransi dengan penanganan perlindungan ekstra ke pintu Anda.",
      icon: Truck,
    },
    {
      title: "Rekber Garansi",
      desc: "Dana diteruskan ke penjual hanya setelah Anda menerima dan menyetujui furnitur sesuai deskripsi.",
      icon: ShieldCheck,
    },
    {
      title: "Gaya Berkelanjutan",
      desc: "Dukung ekonomi sirkular dan kurangi limbah interior rumah dengan memberi kehidupan kedua.",
      icon: Recycle,
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-start text-[#0060A8]">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-sm font-bold text-[#0B192C]">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
