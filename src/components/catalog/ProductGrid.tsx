"use client";

import React, { useMemo } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { ProductItem } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: ProductItem[];
  selectedCategory: string;
  searchTerm: string;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchTerm,
  onSelectProduct
}) => {
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesCity = item.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesCity) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <section id="katalog" className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Hot items > & Update 12 menit lalu */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1 cursor-pointer group">
            <h2 className="text-lg sm:text-xl font-bold text-[#0B192C] group-hover:text-[#0060A8] transition-colors">
              Hot items
            </h2>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0060A8] transition-colors" />
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Update 12 menit lalu
          </span>
        </div>

        {/* 4-Columns Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

        {/* Bottom Button: Lihat Semua Furnitur Preloved ∨ */}
        <div className="flex justify-center mt-8 pt-2">
          <button
            onClick={() => window.scrollTo({ top: 300, behavior: "smooth" })}
            className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-full border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
          >
            <span>Lihat Semua Furnitur Preloved</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </section>
  );
};
