"use client";

import React, { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { ProductItem } from "@/types";

interface ProductCardProps {
  product: ProductItem;
  onSelect?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [isLiked, setIsLiked] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div
      onClick={() => onSelect && onSelect(product)}
      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Floating Condition Badge Top Left */}
        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs shadow-2xs">
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
          title="Simpan"
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors shadow-2xs"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </div>

      {/* Details Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        {/* Brand & Location */}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-semibold text-slate-600 truncate max-w-[130px]">
            {product.brand}
          </span>
          <span className="flex items-center gap-1 shrink-0 text-slate-500">
            <MapPin className="w-3 h-3 text-slate-400" />
            {product.city}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xs sm:text-[13px] text-[#0B192C] line-clamp-1 group-hover:text-[#0060A8] transition-colors">
          {product.title}
        </h3>

        {/* Price & Nego Tag */}
        <div className="pt-1">
          <div className="flex items-center justify-between gap-1">
            <span className="font-extrabold text-sm text-[#0B192C]">
              {formatRupiah(product.price)}
            </span>
            {product.negotiable && (
              <span className="text-[10px] font-bold text-[#0060A8] bg-[#E3F0FF] px-2 py-0.5 rounded-md shrink-0">
                Bisa Nego
              </span>
            )}
          </div>

          {/* Strikethrough price below */}
          {product.originalPrice && (
            <p className="text-[11px] text-slate-400 line-through mt-0.5">
              {formatRupiah(product.originalPrice)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
