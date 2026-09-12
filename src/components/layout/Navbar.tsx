"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Plus, MessageSquare, Bell, User, ShieldCheck, Truck, Menu, X, Sparkles } from "lucide-react";

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
    { id: "all", label: "Semua Kategori" },
    { id: "seating", label: "Sofa & Kursi" },
    { id: "tables", label: "Meja & Kerja" },
    { id: "storage", label: "Lemari & Rak" },
    { id: "beds", label: "Kamar & Kasur" },
    { id: "decor", label: "Lampu & Dekor" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Main Bar: 72px height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#0B192C] text-white flex items-center justify-center font-extrabold text-lg shadow-sm group-hover:bg-[#1A2E4B] transition-colors">
              A
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#0B192C]">
                Attic<span className="text-[#1E88E5]">.</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase -mt-1 hidden sm:block">
                Preloved Furniture
              </p>
            </div>
          </Link>
        </div>

        {/* Center Search Input: Pill shape */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari sofa IKEA, meja jati, credenza vintage..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full pl-11 pr-24 py-2.5 bg-[#F8F9FD] hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0060A8]/20 focus:border-[#0060A8] transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-1.5 bg-[#0B192C] text-white text-xs font-semibold rounded-full hover:bg-[#1A2E4B] transition-colors"
            >
              Cari
            </button>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Chat Icon */}
          <button
            title="Pesan Masuk"
            className="p-2 text-slate-600 hover:text-[#0B192C] hover:bg-slate-100 rounded-full transition-colors relative"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1E88E5] rounded-full"></span>
          </button>

          {/* Notifications */}
          <button
            title="Notifikasi"
            className="p-2 text-slate-600 hover:text-[#0B192C] hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Sell Button (+ Mulai Jualan) */}
          <button
            onClick={onOpenSellerModal}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0B192C] hover:bg-[#1A2E4B] text-white text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Mulai Jualan</span>
          </button>

          {/* User Profile Avatar */}
          <button className="flex items-center gap-1.5 p-1 text-slate-700 hover:bg-slate-100 rounded-full transition-colors ml-1">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-slate-300">
              <User className="w-4 h-4" />
            </div>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sub-navbar: Category Links */}
      <div className="border-t border-slate-100 bg-[#F8F9FD]/60 backdrop-blur-sm overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 py-2 text-xs font-medium">
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#0B192C] text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-[#0B192C] hover:bg-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
          <span className="text-slate-300 px-2">|</span>
          <span className="flex items-center gap-1 text-[#0060A8] font-semibold text-xs px-2 py-1 bg-[#E3F0FF] rounded-full whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-[#1E88E5]" /> Kurasi Jabodetabek
          </span>
        </div>
      </div>

      {/* Mobile Search & Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 p-4 bg-white space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              placeholder="Cari furnitur preloved..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0060A8]"
            />
          </form>
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-medium text-slate-700">
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("all");
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-slate-100"
            >
              Semua Furnitur
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("seating");
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-slate-100"
            >
              Sofa & Kursi
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("tables");
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-slate-100"
            >
              Meja & Kerja
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("storage");
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-slate-100"
            >
              Lemari & Rak
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
