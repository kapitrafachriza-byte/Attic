"use client";

import React, { useState, useEffect } from "react";
import { X, MapPin, Ruler, ShieldCheck, Truck, Sparkles, MessageSquare, AlertTriangle, Check, User, Heart, Share2 } from "lucide-react";
import { ProductItem } from "@/types";

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onProceedToCheckout: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProceedToCheckout
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState("Jakarta Selatan");
  const [offerValue, setOfferValue] = useState("");
  const [isNegoSent, setIsNegoSent] = useState(false);
  const [cargoRate, setCargoRate] = useState<number | null>(null);
  const [recommendedVehicle, setRecommendedVehicle] = useState<string>(product?.recommendedCargo || "VAN");

  useEffect(() => {
    if (!product) return;
    const currentProduct = product;
    let isMounted = true;
    async function calculateCargo() {
      try {
        const res = await fetch("/api/cargo/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lengthCm: currentProduct.dimensions.length,
            widthCm: currentProduct.dimensions.width,
            heightCm: currentProduct.dimensions.height,
            weightKg: currentProduct.dimensions.weightKg || 30,
            originCity: currentProduct.city,
            destinationCity: selectedCity,
            helperCount: 1,
          }),
        });
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setCargoRate(json.data.baseCargoRate);
          setRecommendedVehicle(json.data.vehicleLabel);
        }
      } catch (e) {
        // Fallback to local rate table silently
      }
    }
    calculateCargo();
    return () => {
      isMounted = false;
    };
  }, [selectedCity, product]);

  if (!product) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const images = product.galleryUrls && product.galleryUrls.length > 0 ? product.galleryUrls : [product.imageUrl];

  const shippingEstimates: Record<string, number> = {
    "Jakarta Selatan": 95000,
    "Jakarta Barat": 125000,
    "Jakarta Pusat": 115000,
    "Jakarta Timur": 140000,
    "Jakarta Utara": 155000,
    "Tangerang / BSD": 110000,
    "Depok": 135000,
    "Bekasi": 165000
  };

  const estimatedShipping = cargoRate || shippingEstimates[selectedCity] || 120000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {product.location}, {product.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Gallery Column */}
            <div className="md:col-span-7 space-y-4">
              <div className="relative aspect-4/3 w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={images[activeImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                    {product.conditionLabel}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx ? "border-[#0060A8] ring-2 ring-[#0060A8]/20" : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* MANDATORY FLAW DISCLOSURE SECTION */}
              {product.flawInfo.hasFlaws ? (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Deklarasi Cacat Fisik / Minus Barang</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    {product.flawInfo.description}
                  </p>
                  {product.flawInfo.flawImages.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold text-amber-800 mb-1.5">Foto Close-up Area Minus:</p>
                      <div className="flex gap-2">
                        {product.flawInfo.flawImages.map((fImg, fIdx) => (
                          <div key={fIdx} className="w-24 h-24 rounded-lg overflow-hidden border border-amber-300 relative group">
                            <img src={fImg} alt="Flaw inspection" className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1 rounded">Zoom</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-[10px] text-amber-700 italic pt-1">
                    *Kondisi cacat ini dilindungi jaminan rekber Attic. Bila barang tiba dengan cacat lain di luar deklarasi ini, kamu berhak klaim retur 100%.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-900 text-xs font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Penjual menyatakan barang mulus total tanpa lecet/cacat fisik.</span>
                </div>
              )}
            </div>

            {/* Info & Purchase Column */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0B192C] leading-snug">
                  {product.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">Kategori: <span className="capitalize font-medium text-slate-700">{product.category}</span></p>

                {/* Price Display */}
                <div className="mt-4 p-4 rounded-2xl bg-[#F8F9FD] border border-slate-200/80 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Harga Penjual</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-extrabold text-[#0B192C]">
                      {formatRupiah(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatRupiah(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.negotiable ? (
                    <span className="inline-block mt-1 text-xs font-semibold text-[#0060A8] bg-[#E3F0FF] px-2.5 py-0.5 rounded-full">
                      ✓ Bisa Nego (Buka Penawaran)
                    </span>
                  ) : (
                    <span className="inline-block mt-1 text-xs font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">
                      Harga Pas
                    </span>
                  )}
                </div>
              </div>

              {/* Physical Dimensions & Scale Silhouette */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0B192C] flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-[#0060A8]" /> Dimensi Fisik Presisi
                  </span>
                  {product.dimensions.isKnockdown && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      Knock-Down (Bisa Bongkar)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Panjang</span>
                    <p className="text-sm font-bold text-slate-900">{product.dimensions.length} cm</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Lebar</span>
                    <p className="text-sm font-bold text-slate-900">{product.dimensions.width} cm</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Tinggi</span>
                    <p className="text-sm font-bold text-slate-900">{product.dimensions.height} cm</p>
                  </div>
                </div>

                {/* Grounding Human Scale Silhouette */}
                <div className="flex items-center justify-between text-xs text-slate-500 bg-blue-50/50 p-2.5 rounded-xl">
                  <span className="text-[11px]">Skala Ruang: Muat di pintu standar (80×200cm)</span>
                  <span className="font-bold text-blue-700 text-[11px]">Aman</span>
                </div>
              </div>

              {/* Instant Cargo Shipping Calculator */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-3 bg-[#F8F9FD]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#0060A8]" /> Simulasi Ongkir Kargo
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">
                    Armada: {recommendedVehicle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="flex-1 text-xs py-2 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0060A8]"
                  >
                    <option value="Jakarta Selatan">Kirim ke: Jakarta Selatan</option>
                    <option value="Jakarta Pusat">Kirim ke: Jakarta Pusat</option>
                    <option value="Jakarta Barat">Kirim ke: Jakarta Barat</option>
                    <option value="Jakarta Timur">Kirim ke: Jakarta Timur</option>
                    <option value="Jakarta Utara">Kirim ke: Jakarta Utara</option>
                    <option value="Tangerang / BSD">Kirim ke: Tangerang / BSD</option>
                    <option value="Depok">Kirim ke: Depok</option>
                    <option value="Bekasi">Kirim ke: Bekasi</option>
                  </select>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#0B192C]">
                      ~{formatRupiah(estimatedShipping)}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500">
                  *Ongkos kurir kargo dihitung otomatis di checkout. Tersedia opsi Helper tambahan di dalam unit.
                </p>
              </div>

              {/* Seller Profile Box */}
              <div className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={product.seller.avatarUrl}
                    alt={product.seller.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{product.seller.name}</span>
                      {product.seller.verified && (
                        <span className="w-3.5 h-3.5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold">✓</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500">Rating {product.seller.rating} ★ • Balas {product.seller.responseTime}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0060A8]" />
                  <span>Chat</span>
                </button>
              </div>

              {/* Make an Offer Section */}
              {product.negotiable && (
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0060A8]">Tawar Harga (Bisa Nego)</span>
                    <span className="text-[10px] text-slate-500">Diskon wajar max 20%</span>
                  </div>
                  {isNegoSent ? (
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold text-center">
                      ✓ Penawaran telah dikirim ke penjual! Tunggu balasan di chat.
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Contoh: 2200000"
                        value={offerValue}
                        onChange={(e) => setOfferValue(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => {
                          if (offerValue) setIsNegoSent(true);
                        }}
                        className="px-4 py-1.5 bg-[#0060A8] text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
                      >
                        Kirim Tawaran
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Main Checkout Action */}
              <div className="pt-2">
                <button
                  onClick={() => onProceedToCheckout(product)}
                  className="w-full py-3.5 bg-[#0B192C] hover:bg-[#1A2E4B] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Beli Sekarang — Dilindungi Rekber Attic</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Dana ditahan di Escrow dan baru cair 24 jam setelah barang tiba.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
