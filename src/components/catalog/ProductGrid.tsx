"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, Sparkles, Filter, RotateCcw } from "lucide-react";
import { ProductItem } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: ProductItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchTerm: string;
  onSelectProduct: (product: ProductItem) => void;
  onQuickCheckout: (product: ProductItem) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSelectProduct,
  onQuickCheckout
}) => {
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Condition filter
      if (selectedCondition !== "all" && item.conditionTier !== selectedCondition) {
        return false;
      }
      // City filter
      if (selectedCity !== "all" && !item.city.toLowerCase().includes(selectedCity.toLowerCase())) {
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
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return b.viewsCount - a.viewsCount; // popular
    });
  }, [products, selectedCategory, selectedCondition, selectedCity, searchTerm, sortBy]);

  const resetFilters = () => {
    onSelectCategory("all");
    setSelectedCondition("all");
    setSelectedCity("all");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedCondition !== "all" || selectedCity !== "all";

  return (
    <section id="katalog" className="py-10 bg-[#F8F9FD]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0060A8]"></span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B192C]">
                Hot Items & Katalog Furnitur Terkurasi
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Menampilkan {filteredProducts.length} furnitur siap kirim di Jabodetabek dengan jaminan kondisi akurat
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs py-2 px-3 bg-white border border-slate-200 rounded-full font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0060A8]"
            >
              <option value="popular">Paling Populer</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Filter Bar Chips */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Condition Pill Filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: "all", label: "Semua Kondisi" },
                { id: "LIKE_NEW", label: "Like New (99%)" },
                { id: "GENTLY_LOVED", label: "Gently Loved" },
                { id: "VINTAGE_CHARACTER", label: "Vintage Patina" }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCondition(c.id)}
                  className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    selectedCondition === c.id
                      ? "bg-[#0B192C] text-white font-semibold"
                      : "bg-[#F8F9FD] text-slate-600 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-200 hidden md:block"></div>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs py-1.5 px-3 bg-[#F8F9FD] border border-slate-200 rounded-full font-medium text-slate-700"
            >
              <option value="all">Semua Lokasi</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Utara">Jakarta Utara</option>
              <option value="Tangerang">Tangerang / BSD</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold ml-auto"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid: 1-col mobile, 2-col tablet, 3-col desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onSelect={onSelectProduct}
                onQuickCheckout={onQuickCheckout}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
              🔍
            </div>
            <h3 className="font-bold text-base text-[#0B192C]">
              Tidak Ada Furnitur yang Cocok
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian atau reset filter untuk melihat koleksi lainnya.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-[#0B192C] text-white text-xs font-semibold rounded-full mt-2"
            >
              Tampilkan Semua Furnitur
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
