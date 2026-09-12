"use client";

import React from "react";
import { ArrowRight, Plus, ShieldCheck, Truck, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroBannerProps {
  onStartSelling?: () => void;
  onHowItWorksClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartSelling,
  onHowItWorksClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF4FC] via-white to-white py-12 md:py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E3F0FF] border border-[#BFDBFE] text-xs font-semibold text-[#0060A8]">
              <Sparkles className="w-3.5 h-3.5 text-[#1E88E5]" />
              <span>Marketplace Furnitur Preloved & Vintage Terkurasi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight leading-[1.15]">
              Jual-Beli Furnitur Preloved & Vintage Lebih Mudah
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Solusi tuntas furnitur bekas di Jabodetabek. Tanpa khawatir barang cacat disembunyikan, 
              bebas pusing cari mobil pikap/helper angkut tangga, dan transaksi 100% aman dengan rekening bersama.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartSelling}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#0B192C] hover:bg-[#1A2E4B] text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Mulai Berjualan</span>
              </button>

              <button
                onClick={onHowItWorksClick}
                className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-[#F8F9FD] text-[#0B192C] font-semibold text-sm rounded-full border border-slate-300 shadow-2xs hover:border-slate-400 transition-all"
              >
                <span>Cara Kerjanya</span>
                <ArrowRight className="w-4 h-4 text-[#0060A8]" />
              </button>
            </div>

            {/* Quick Guarantees / Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Rekber 24 Jam</p>
                  <p className="text-[11px] text-slate-500">Cek barang sebelum dana cair</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <Truck className="w-4 h-4 text-[#0060A8] shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Kurir Kargo + Helper</p>
                  <p className="text-[11px] text-slate-500">Jemput & antar ke lantai kamar</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Foto Cacat Jujur</p>
                  <p className="text-[11px] text-slate-500">Wajib foto lecet & dimensi PxLxT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Lifestyle Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
                  alt="Living Room Scandinavian Furniture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Floating Tag in Image */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-between border border-slate-100">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] mb-1">
                      Mulus 95% • Like New
                    </span>
                    <h3 className="font-bold text-sm text-[#0B192C]">Sofa 2-Seater Scandinavia</h3>
                    <p className="text-xs text-slate-500">IKEA Landskrona • BSD Tangsel</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 line-through">Rp 4.999.000</p>
                    <p className="font-extrabold text-sm text-[#0B192C]">Rp 2.450.000</p>
                    <span className="text-[10px] font-semibold text-[#0060A8] bg-[#E3F0FF] px-1.5 py-0.5 rounded-full">
                      Bisa Nego
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Floating Badge */}
              <div className="absolute -top-4 -right-3 sm:-right-4 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">Garansi Cek 24 Jam</p>
                  <p className="text-[10px] text-slate-500">Barang tak sesuai? Uang kembali</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
