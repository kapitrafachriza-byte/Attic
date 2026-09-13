"use client";

import React, { useState } from "react";
import { X, ArrowRight, ArrowLeft, Camera, AlertTriangle, Check, Upload, Building, DollarSign, Sparkles } from "lucide-react";
import { ConditionTier } from "@/types";

interface SellerListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newListing: any) => void;
}

export const SellerListingModal: React.FC<SellerListingModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("seating");
  const [brand, setBrand] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [isKnockdown, setIsKnockdown] = useState(false);

  // Condition & Flaw Disclosure (Mandatory)
  const [conditionTier, setConditionTier] = useState<ConditionTier>("GENTLY_LOVED");
  const [flawDescription, setFlawDescription] = useState("");
  const [flawUploaded, setFlawUploaded] = useState(false);
  const [mainPhotoUploaded, setMainPhotoUploaded] = useState(false);

  // Pickup Address & Price
  const [city, setCity] = useState("Jakarta Selatan");
  const [buildingType, setBuildingType] = useState<"house" | "apartment">("apartment");
  const [floorLevel, setFloorLevel] = useState("3");
  const [hasServiceElevator, setHasServiceElevator] = useState(true);
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Take rate calculation (5% Attic marketplace fee per PRD)
  const rawPrice = Number(price) || 0;
  const platformFee = Math.round(rawPrice * 0.05);
  const netEarnings = Math.max(0, rawPrice - platformFee);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleNext = () => {
    // Step validations
    if (currentStep === 1) {
      if (!title) {
        alert("Harap isi judul listing perabot");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!length || !width || !height) {
        alert("Dimensi fisik (Panjang, Lebar, Tinggi) wajib diisi untuk kalkulasi armada kargo.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Mandatory Flaw Check: If condition != LIKE_NEW, flaw photo & desc is required!
      if (conditionTier !== "LIKE_NEW") {
        if (!flawUploaded || !flawDescription) {
          alert("Sesuai standar kejujuran Attic: Jika kondisi barang selain 'Like New', kamu WAJIB menyertakan deskripsi lecet/minus dan mengunggah foto close-up area cacat!");
          return;
        }
      }
      setCurrentStep(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || rawPrice < 50000) {
      alert("Harap masukkan harga jual yang valid (minimal Rp 50.000)");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title,
        brand: brand || "Custom / Local Studio",
        category,
        conditionTier,
        price: rawPrice,
        originalPrice: rawPrice * 1.5,
        negotiable,
        location: "Kec. Kebayoran",
        city,
        dimensions: {
          length: Number(length),
          width: Number(width),
          height: Number(height),
          weightKg: Number(weightKg) || 25,
          isKnockdown,
        },
        flawInfo: {
          hasFlaws: conditionTier !== "LIKE_NEW",
          description: flawDescription || "Mulus tanpa lecet",
          flawImages: flawUploaded
            ? ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"]
            : [],
        },
        images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        ],
      };

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        alert(
          "Peringatan Verifikasi Kurasi Attic:\n" +
            (json.errors ? json.errors.join("\n") : json.error || "Gagal memproses iklan.")
        );
        setIsSubmitting(false);
        return;
      }

      alert(json.message || "Iklan berhasil dikirim ke Meja Moderasi Attic!");

      const newProduct = {
        id: json.data?.pendingListing?.id || "attic-" + Date.now(),
        title,
        brand: brand || "Custom / Local Studio",
        category: category as any,
        conditionTier,
        conditionLabel: conditionTier === "LIKE_NEW" ? "Like New (99%)" : "Mulus 90%",
        price: rawPrice,
        originalPrice: rawPrice * 1.5,
        negotiable,
        location: "Kec. Kebayoran",
        city,
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        galleryUrls: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"],
        dimensions: {
          length: Number(length),
          width: Number(width),
          height: Number(height),
          weightKg: Number(weightKg) || 25,
          isKnockdown,
        },
        flawInfo: {
          hasFlaws: conditionTier !== "LIKE_NEW",
          description: flawDescription || "Mulus tanpa lecet",
          flawImages: flawUploaded
            ? ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"]
            : [],
        },
        recommendedCargo: (Number(length) > 160 ? "PICKUP_BOX" : "VAN") as any,
        viewsCount: 1,
        likesCount: 0,
        seller: {
          id: "sel-me",
          name: "Akun Kamu",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          rating: 5.0,
          responseTime: "< 5 menit",
          verified: true,
        },
        deepCleanAvailable: category === "seating" || category === "beds",
      };

      onSuccess(newProduct as any);
      onClose();
    } catch (err: any) {
      alert("Terjadi kesalahan jaringan saat mengirim iklan: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div>
            <h3 className="font-extrabold text-lg text-[#0B192C]">
              Jual Furnitur Preloved
            </h3>
            <p className="text-xs text-slate-500">Langkah {currentStep} dari 4: {
              currentStep === 1 ? "Informasi Dasar" :
              currentStep === 2 ? "Dimensi Fisik (PxLxT)" :
              currentStep === 3 ? "Standar Kondisi & Foto Lecet" : "Akses Gedung & Harga Jual"
            }</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-[#0060A8] h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Furnitur
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm p-3 bg-[#F8F9FD] border border-slate-200 rounded-xl"
                >
                  <option value="seating">Sofa, Kursi Kerja & Lounge</option>
                  <option value="tables">Meja Makan, Meja Kerja & Coffee Table</option>
                  <option value="storage">Lemari Pakaian, Rak Buku & Credenza</option>
                  <option value="beds">Rangka Tempat Tidur & Kasur</option>
                  <option value="decor">Lampu Lantai & Dekorasi Ruang</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Iklan Furnitur <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sofa 2-Seater Scandinavian Cream Bahan Fabric"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm p-3 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060A8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Merek / Desainer
                  </label>
                  <input
                    type="text"
                    placeholder="IKEA / Informa / Custom"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full text-sm p-3 bg-[#F8F9FD] border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kota Penjemputan
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-sm p-3 bg-[#F8F9FD] border border-slate-200 rounded-xl"
                  >
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                    <option value="Jakarta Barat">Jakarta Barat</option>
                    <option value="Jakarta Timur">Jakarta Timur</option>
                    <option value="Jakarta Utara">Jakarta Utara</option>
                    <option value="Tangerang Selatan (BSD)">Tangerang Selatan (BSD)</option>
                    <option value="Depok">Depok</option>
                    <option value="Bekasi">Bekasi</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload Placeholder */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Foto Keseluruhan (Tampak Depan, Samping, Belakang)
                </label>
                <div
                  onClick={() => setMainPhotoUploaded(!mainPhotoUploaded)}
                  className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    mainPhotoUploaded ? "border-emerald-500 bg-emerald-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <Camera className={`w-8 h-8 ${mainPhotoUploaded ? "text-emerald-600" : "text-slate-400"}`} />
                  <p className="text-xs font-semibold text-slate-700 mt-2">
                    {mainPhotoUploaded ? "✓ 3 Foto berhasil dipilih (Terkonfirmasi)" : "Klik untuk upload foto (Minimal 3 foto)"}
                  </p>
                  <span className="text-[10px] text-slate-500 mt-1">Format JPG, PNG, WEBP (Otomatis dikompres)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Precise Dimensions */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 leading-relaxed">
                ℹ️ <strong>Kenapa dimensi wajib?</strong> Dimensi digunakan oleh sistem Attic untuk otomatis merekomendasikan kapasitas armada mobil (Van vs Pikap vs Truk Engkel) agar barang tidak tertolak saat kurir tiba.
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Panjang (cm) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 160"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full text-sm p-3 bg-[#F8F9FD] border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lebar (cm) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 85"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full text-sm p-3 bg-[#F8F9FD] border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tinggi (cm) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 75"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full text-sm p-3 bg-[#F8F9FD] border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimasi Berat (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 30"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full text-sm p-3 bg-[#F8F9FD] border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isKnockdown}
                      onChange={(e) => setIsKnockdown(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0060A8]"
                    />
                    <span className="text-xs font-semibold text-slate-700">Bisa Bongkar Pasang (Knock-down)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Mandatory Flaw Disclosure */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Tingkatan Kondisi Standar (Pilih satu):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "LIKE_NEW", title: "Like New (98-100%)", desc: "Nyaris tanpa cela, pemakaian sangat singkat" },
                    { id: "GENTLY_LOVED", title: "Gently Loved (85-95%)", desc: "Terawat baik, terdapat tanda pakai wajar/lecet halus" },
                    { id: "VINTAGE_CHARACTER", title: "Vintage Character", desc: "Furnitur retro/antik dengan patina alami" },
                    { id: "NEEDS_DIY", title: "Needs DIY Love", desc: "Ada bagian butuh perbaikan/touch up" }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setConditionTier(tier.id as ConditionTier)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        conditionTier === tier.id
                          ? "border-[#0060A8] bg-[#E3F0FF] ring-2 ring-[#0060A8]/20"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <p className="font-bold text-xs text-[#0B192C]">{tier.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* MANDATORY FLAW SECTION */}
              {conditionTier !== "LIKE_NEW" ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Wajib: Deklarasikan Minus & Foto Close-Up</span>
                  </div>
                  <p className="text-xs text-amber-900">
                    Karena kamu memilih selain Like New, cantumkan lecet/noda dengan jujur agar transaksi aman dan bebas sengketa saat barang tiba.
                  </p>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Ada lecet 2cm di kaki kiri bawah dan noda samar di kain dudukan."
                      value={flawDescription}
                      onChange={(e) => setFlawDescription(e.target.value)}
                      className="w-full text-xs p-3 bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div
                    onClick={() => setFlawUploaded(!flawUploaded)}
                    className={`p-4 border-2 border-dashed rounded-xl flex items-center justify-center gap-2 cursor-pointer ${
                      flawUploaded ? "border-emerald-500 bg-emerald-100/50" : "border-amber-300 bg-white"
                    }`}
                  >
                    <Upload className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-amber-900">
                      {flawUploaded ? "✓ Foto Makro Lecet Terlampir" : "Upload Foto Jarak Dekat Bagian Lecet"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Kondisi Like New: Menyatakan barang bebas cacat/lecet.</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Building Access & Pricing */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Access detail */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#0060A8]" /> Detail Akses Bangunan Penjemputan
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setBuildingType("apartment")}
                    className={`p-2.5 rounded-xl border font-semibold ${
                      buildingType === "apartment" ? "border-[#0060A8] bg-[#E3F0FF] text-[#0060A8]" : "border-slate-200 bg-white"
                    }`}
                  >
                    Apartemen / Unit Bertingkat
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuildingType("house")}
                    className={`p-2.5 rounded-xl border font-semibold ${
                      buildingType === "house" ? "border-[#0060A8] bg-[#E3F0FF] text-[#0060A8]" : "border-slate-200 bg-white"
                    }`}
                  >
                    Rumah Tapak (Lantai 1)
                  </button>
                </div>

                {buildingType === "apartment" && (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Lantai Unit</label>
                      <input
                        type="text"
                        value={floorLevel}
                        onChange={(e) => setFloorLevel(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div className="flex items-center pt-4">
                      <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasServiceElevator}
                          onChange={(e) => setHasServiceElevator(e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-[#0060A8]"
                        />
                        <span>Ada Lift Barang</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Price setting with take-rate calculator */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Harga Jual (Rp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm font-bold text-slate-400">Rp</span>
                  <input
                    type="number"
                    placeholder="Contoh: 2450000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl font-bold text-[#0B192C] focus:bg-white focus:ring-2 focus:ring-[#0060A8]"
                  />
                </div>
              </div>

              {/* Take-rate transparent calculator */}
              {rawPrice > 0 && (
                <div className="p-3.5 rounded-2xl bg-[#EFF4FC] border border-blue-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Komisi Platform (10%):</span>
                    <span className="text-rose-600 font-semibold">- {formatRupiah(platformFee)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-blue-200/80 font-bold text-sm text-[#0B192C]">
                    <span>Estimasi Dana Bersih Diterima:</span>
                    <span className="text-emerald-700 font-extrabold">{formatRupiah(netEarnings)}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1">
                    *Dana langsung masuk ke Dompet Saldo Penjual setelah barang dicek pembeli selama 24 jam.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-full"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#1A2E4B] rounded-full shadow-xs"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-full shadow-md transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Mengirim ke Meja Kurasi..." : "Tayangkan Iklan Furnitur"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
