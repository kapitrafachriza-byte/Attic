"use client";

import React from "react";
import { CheckCircle2, LayoutGrid, Tag } from "lucide-react";

interface SellerBannerProps {
  onStartSelling?: () => void;
}

export const SellerBanner: React.FC<SellerBannerProps> = ({ onStartSelling }) => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F0F5FD] border border-[#E0ECFD] p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Copy */}
            <div className="space-y-4 max-w-2xl">
              {/* Tag */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0060A8]">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Ruang Lega, Cuan Tambahan</span>
              </div>

              {/* Headline */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B192C] tracking-tight">
                Punya sofa atau meja yang sudah tidak terpakai?
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Foto dari smartphone, pasang harga sendiri, dan kurir rekanan Attic siap menjemput barang berukuran besar langsung dari pintu kamarmu.
              </p>

              {/* Checkmarks */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0060A8] shrink-0" />
                  <span className="font-medium">0% Biaya Tayang</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0060A8] shrink-0" />
                  <span className="font-medium">Jemput ke Lokasi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0060A8] shrink-0" />
                  <span className="font-medium">Dana Cair Cepat</span>
                </div>
              </div>
            </div>

            {/* Right Button */}
            <div className="flex flex-col items-start lg:items-end justify-center space-y-2 shrink-0">
              <button
                onClick={onStartSelling}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-full shadow-sm transition-all"
              >
                <Tag className="w-4 h-4" />
                <span>Pasang Iklan Sekarang — Gratis</span>
              </button>
              <p className="text-xs text-slate-500 pl-1">
                Hanya butuh 2 menit untuk tayang
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
