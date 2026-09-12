"use client";

import React from "react";
import Link from "next/link";
import { AtticLogo } from "@/components/common/AtticLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          {/* Left: Attic Logo + Copyright */}
          <div className="flex items-center gap-3">
            <span
              className="font-serif font-bold text-base text-[#0B192C]"
              style={{ fontFamily: "'Playfair Display', Georgia, Cambria, 'Times New Roman', serif" }}
            >
              Attic
            </span>
            <span className="text-slate-300">|</span>
            <span>© 2024 Attic Furniture Indonesia. Hak cipta dilindungi.</span>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex items-center space-x-6 text-slate-600 font-medium">
            <Link href="#cara-pakai" className="hover:text-black transition-colors">
              Cara Belanja
            </Link>
            <Link href="#cara-pakai" className="hover:text-black transition-colors">
              Cara Jual
            </Link>
            <Link href="#cara-pakai" className="hover:text-black transition-colors">
              Bantuan & Keamanan
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
