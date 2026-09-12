"use client";

import React, { useState } from "react";
import { Heart, MapPin, Ruler, Truck, Sparkles } from "lucide-react";
import { ProductItem } from "@/types";

interface ProductCardProps {
  product: ProductItem;
  onSelect?: (product: ProductItem) => void;
  onQuickCheckout?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickCheckout
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const getConditionStyle = (tier: string) => {
    switch (tier) {
      case "LIKE_NEW":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-500/30";
      case "GENTLY_LOVED":
        return "bg-slate-900/80 text-slate-100 border-slate-700/50";
      case "VINTAGE_CHARACTER":
        return "bg-amber-950/80 text-amber-300 border-amber-500/30";
      case "NEEDS_DIY":
        return "bg-rose-950/80 text-rose-300 border-rose-500/30";
      default:
        return "bg-slate-900/80 text-slate-100 border-slate-700/50";
    }
  };

  const getCargoLabel = (cargo: string) => {
    switch (cargo) {
      case "VAN":
        return "Van Kargo";
      case "PICKUP_BAK":
        return "Pikap Bak";
      case "PICKUP_BOX":
        return "Pikap Boks";
      case "ENGKEL":
        return "Truk Engkel";
      default:
        return "Kargo";
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* Top Image Container: 4:3 Aspect Ratio */}
      <div 
        onClick={() => onSelect && onSelect(product)}
        className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Floating Condition Badge Top Left */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border shadow-2xs ${getConditionStyle(product.conditionTier)}`}>
            {product.conditionLabel}
          </span>
        </div>

        {/* Wishlist Heart Top Right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          title="Simpan ke Wishlist"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors shadow-2xs"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Flaw Indicator Badge if item has flaws */}
        {product.flawInfo.hasFlaws && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="inline-flex items-center text-[10px] font-semibold bg-amber-500/90 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
              ⚠️ Ada Foto Cacat Fisik
            </span>
          </div>
        )}
      </div>

      {/* Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Brand & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700 truncate max-w-[150px]">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 shrink-0 text-slate-500">
              <MapPin className="w-3 h-3 text-slate-400" />
              {product.city.replace("Jakarta", "Jak")}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelect && onSelect(product)}
            className="font-bold text-sm text-[#0B192C] line-clamp-2 cursor-pointer hover:text-[#0060A8] transition-colors leading-snug"
          >
            {product.title}
          </h3>

          {/* Dimension Tag */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
            <Ruler className="w-3 h-3 text-slate-400" />
            <span>{product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm</span>
            {product.dimensions.isKnockdown && (
              <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">Bisa Bongkar</span>
            )}
          </div>
        </div>

        {/* Pricing & Nego Badge */}
        <div className="pt-3 mt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-base text-[#0B192C]">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 pt-1">
            <div className="flex items-center gap-1.5">
              {product.negotiable ? (
                <span className="text-[11px] font-semibold text-[#0060A8] bg-[#E3F0FF] px-2 py-0.5 rounded-full">
                  Bisa Nego
                </span>
              ) : (
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Harga Pas
                </span>
              )}

              {product.deepCleanAvailable && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full" title="Bisa pesan jasa deep clean">
                  <Sparkles className="w-2.5 h-2.5" /> Cuci Higienis
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              <span>{getCargoLabel(product.recommendedCargo)}</span>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2">
            <button
              onClick={() => onSelect && onSelect(product)}
              className="w-full py-1.5 px-2 text-xs font-semibold text-slate-700 bg-[#F8F9FD] hover:bg-slate-200/70 border border-slate-200 rounded-lg transition-colors text-center"
            >
              Lihat Detail
            </button>
            <button
              onClick={() => onQuickCheckout && onQuickCheckout(product)}
              className="w-full py-1.5 px-2 text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#1A2E4B] rounded-lg transition-colors text-center shadow-2xs"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
