"use client";

import React from "react";
import { ArrowRight, Plus } from "lucide-react";

interface HeroBannerProps {
  onStartSelling?: () => void;
  onHowItWorksClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartSelling,
  onHowItWorksClick,
}) => {
  return (
    <section className="pt-4 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-width Rounded Lifestyle Banner */}
        <div className="relative overflow-hidden rounded-3xl min-h-[420px] sm:min-h-[480px] flex items-center shadow-sm">
          {/* Background Image: Couple moving wooden coffee table */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')`,
            }}
          ></div>

          {/* Dark Overlay for Left Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20 md:to-transparent"></div>

          {/* Left Text Content */}
          <div className="relative z-10 p-8 sm:p-14 max-w-2xl space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.18]">
              Jual–Beli Furnitur Preloved &<br />
              Vintage Lebih Mudah
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl font-normal">
              Temukan furnitur berkualitas harga hemat atau jual barang rumahmu tanpa ribet ke ribuan penikmat interior di seluruh Indonesia.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onStartSelling}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-[#0B192C] font-semibold text-xs sm:text-sm rounded-full shadow-md transition-all group"
              >
                <div className="w-5 h-5 rounded-full border border-[#0B192C] flex items-center justify-center">
                  <Plus className="w-3 h-3 text-[#0B192C]" />
                </div>
                <span>Mulai Berjualan</span>
              </button>

              <button
                onClick={onHowItWorksClick}
                className="flex items-center gap-2 px-6 py-3 bg-black/30 hover:bg-black/40 text-white font-semibold text-xs sm:text-sm rounded-full border border-white/40 backdrop-blur-xs transition-all"
              >
                <span>Cara Kerjanya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
