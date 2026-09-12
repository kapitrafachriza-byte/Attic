"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Sparkles, MapPin, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800 text-sm">
      {/* Upper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white text-[#0B192C] flex items-center justify-center font-extrabold text-base">
                A
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Attic<span className="text-[#1E88E5]">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Marketplace furnitur preloved, vintage & refurbished terkurasi pertama di Indonesia dengan 
              standar transparansi kondisi, jaminan rekening bersama 24 jam, dan kurir kargo on-demand.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Wilayah Pilot: Jabodetabek
              </span>
            </div>
          </div>

          {/* Col 2: Kategori */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Kategori</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="#katalog" className="hover:text-white transition-colors">Sofa & Kursi Lounge</Link></li>
              <li><Link href="#katalog" className="hover:text-white transition-colors">Meja Kerja & Makan</Link></li>
              <li><Link href="#katalog" className="hover:text-white transition-colors">Lemari & Rak Buku</Link></li>
              <li><Link href="#katalog" className="hover:text-white transition-colors">Rangka Kasur & Tempat Tidur</Link></li>
              <li><Link href="#katalog" className="hover:text-white transition-colors">Lampu & Dekor Interior</Link></li>
            </ul>
          </div>

          {/* Col 3: Layanan & Keamanan */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Keamanan & Logistik</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <Link href="#cara-pakai" className="hover:text-white transition-colors">Rekber Escrow 24 Jam</Link>
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                <Link href="#cara-pakai" className="hover:text-white transition-colors">Kurir Kargo + Helper</Link>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <Link href="#cara-pakai" className="hover:text-white transition-colors">Deep Cleaning Sanitasi</Link>
              </li>
              <li><Link href="#cara-pakai" className="hover:text-white transition-colors">Panduan Ukur Dimensi Ruang</Link></li>
              <li><Link href="#cara-pakai" className="hover:text-white transition-colors">Pusat Bantuan & Sengketa</Link></li>
            </ul>
          </div>

          {/* Col 4: Attic & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="#" className="hover:text-white transition-colors">Tentang Attic</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mitra Armada Kargo</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hubungi Layanan CS</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Bottom Bar */}
      <div className="border-t border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Attic Marketplace. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1">
            Dirancang dengan <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> untuk pecinta furnitur preloved Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
