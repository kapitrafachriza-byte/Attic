"use client";

import React from "react";
import { Armchair, Sparkles, Lamp, Warehouse, Layers, Trees } from "lucide-react";

interface CategoryFilterPillsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilterPills: React.FC<CategoryFilterPillsProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const categories = [
    { id: "all", label: "Semua Furnitur", icon: null },
    { id: "seating", label: "Sofa & Lounge", icon: Armchair },
    { id: "tables", label: "Meja Makan & Kerja", icon: Layers },
    { id: "storage", label: "Lemari & Rak Buku", icon: Warehouse },
    { id: "decor", label: "Lampu & Dekorasi", icon: Lamp },
    { id: "outdoor", label: "Outdoor & Teras", icon: Trees },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 bg-white overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-2.5 sm:gap-3">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#0B192C] text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
