"use client";

import React from "react";
import { Plus, CheckCircle2, Clock, Shield, Truck } from "lucide-react";

interface SellerBannerProps {
  onStartSelling?: () => void;
}

export const SellerBanner: React.FC<SellerBannerProps> = ({ onStartSelling }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EFF4FC] via-[#E3F0FF]/60 to-[#EFF4FC] border border-[#BFDBFE]/60 p-8 sm:p-12 shadow-xs">
          {/* Subtle decorative background circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-200/20 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-slate-300/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#0060A8] shadow-2xs border border-blue-100">
                <Truck className="w-3.5 h-3.5 text-[#1E88E5]" />
                Solusi Decluttering Mudah di Jabodetabek
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B192C] tracking-tight">
                Punya sofa atau meja yang sudah tidak terpakai?
              </h2>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                Ubah furnitur bekas jadi uang tunai tanpa repot angkut sendiri. Kurir kargo rekanan Attic jemput langsung ke unit apartemen atau rumahmu.
              </p>

              {/* Selling Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/60">
                  <CheckCircle2 className="w-4 h-4 text-[#0060A8] shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">0% Biaya Tayang</p>
                    <p className="text-[11px] text-slate-500">Gratis pasang iklan</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/60">
                  <Truck className="w-4 h-4 text-[#0060A8] shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Jemput ke Lokasi</p>
                    <p className="text-[11px] text-slate-500">Tak perlu sewa pikap sendiri</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/60">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Dana Cair Pasti</p>
                    <p className="text-[11px] text-slate-500">Langsung ke rekening bank</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right CTA */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-2">
              <button
                onClick={onStartSelling}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-[#0B192C] hover:bg-[#1A2E4B] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Pasang Iklan Sekarang — Gratis</span>
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-2 lg:pr-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Hanya butuh 2 menit untuk tayang</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
