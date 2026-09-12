"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Plus, MessageSquare, Bell, Menu, X } from "lucide-react";
import { AtticLogo } from "@/components/common/AtticLogo";

interface NavbarProps {
  onOpenSellerModal?: () => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSellerModal,
  searchTerm: controlledSearchTerm = "",
  onSearchChange,
  selectedCategory = "all",
  onSelectCategory
}) => {
  const [searchTerm, setSearchTerm] = useState(controlledSearchTerm);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  };

  const navCategories = [
    { id: "seating", label: "Sofa & Lounge" },
    { id: "tables", label: "Meja & Kursi" },
    { id: "storage", label: "Lemari & Rak" },
    { id: "decor", label: "Lampu & Dekor" },
    { id: "brands", label: "Brand & Desainer" },
    { id: "promo", label: "Promo/Sale" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        {/* Left: Attic Arch Logo */}
        <div className="flex items-center shrink-0">
          <AtticLogo size="md" />
        </div>

        {/* Center: Search Bar with Pill Shape */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari sofa vintage, meja makan, kursi kerja..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-[#F4F6F9] hover:bg-[#EEF1F6] focus:bg-white border border-transparent focus:border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B192C]/10 transition-all"
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Sell Button (+ Mulai Jualan) */}
          <button
            onClick={onOpenSellerModal}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-slate-800 text-white text-xs font-semibold rounded-full shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Mulai Jualan</span>
          </button>

          {/* Chat Icon */}
          <button
            title="Pesan"
            className="p-2 text-slate-700 hover:text-black hover:bg-slate-100 rounded-full transition-colors"
          >
            <MessageSquare className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Notifications */}
          <button
            title="Notifikasi"
            className="p-2 text-slate-700 hover:text-black hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 ml-1 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-slate-700 hover:bg-slate-100 rounded-lg ml-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sub-navbar: Category Links */}
      <div className="border-t border-slate-100 bg-white overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-6 py-2.5 text-xs text-slate-600 font-medium">
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`whitespace-nowrap transition-colors hover:text-black ${
                  isActive ? "text-black font-bold" : "text-slate-600"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Search Input */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 p-4 bg-white space-y-3">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              placeholder="Cari sofa vintage, meja makan..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-xs text-slate-800"
            />
          </form>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 pt-1">
            {navCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(c.id);
                  setMobileMenuOpen(false);
                }}
                className="p-2 bg-slate-50 rounded-lg text-left"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
