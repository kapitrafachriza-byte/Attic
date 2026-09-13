// Attic Seller Listing Validator Service
// Implements mandatory flaw disclosure & dimensional checking per PRD 7.2.1

import { ConditionTier, Dimensions, FlawDisclosure } from "@/types";

export interface ListingValidationInput {
  title: string;
  brand?: string;
  category: string;
  conditionTier: ConditionTier;
  price: number;
  originalPrice?: number;
  negotiable?: boolean;
  city: string;
  location: string;
  dimensions: Dimensions;
  flawInfo: FlawDisclosure;
  images: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  calculatedFees: {
    price: number;
    platformCommissionRate: number; // 5%
    platformFee: number;
    sellerEstimatedPayout: number;
  };
}

export const VALID_JABODETABEK_CITIES = [
  "Jakarta Selatan",
  "Jakarta Pusat",
  "Jakarta Barat",
  "Jakarta Timur",
  "Jakarta Utara",
  "Tangerang",
  "Tangerang Selatan",
  "BSD",
  "Bekasi",
  "Depok",
  "Bogor",
];

export class ListingValidator {
  static readonly PLATFORM_FEE_PERCENT = 0.05; // 5% Attic fee

  /**
   * Validates a listing submission against Attic PRD marketplace policies
   */
  static validate(input: ListingValidationInput): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Title validation
    if (!input.title || input.title.trim().length < 8) {
      errors.push("Judul produk minimal harus 8 karakter agar jelas dan mudah dicari pembeli.");
    }

    // 2. Category validation
    if (!input.category || input.category.trim().length === 0) {
      errors.push("Kategori perabot wajib dipilih.");
    }

    // 3. Price validation
    if (!input.price || input.price < 50000) {
      errors.push("Harga jual perabot minimal Rp 50.000.");
    }
    if (input.originalPrice && input.originalPrice < input.price) {
      warnings.push("Harga beli baru lebih rendah dari harga jual. Mohon periksa kembali jika salah ketik.");
    }

    // 4. Physical Dimensions validation (PRD 7.4)
    if (!input.dimensions) {
      errors.push("Dimensi fisik perabot (panjang, lebar, tinggi) wajib diisi untuk estimasi kurir kargo.");
    } else {
      const { length, width, height } = input.dimensions;
      if (!length || length <= 0) errors.push("Panjang barang harus lebih besar dari 0 cm.");
      if (!width || width <= 0) errors.push("Lebar barang harus lebih besar dari 0 cm.");
      if (!height || height <= 0) errors.push("Tinggi barang harus lebih besar dari 0 cm.");

      if (length > 500 || width > 500 || height > 500) {
        errors.push("Dimensi melebihi batas maksimal kargo Attic (500 cm). Harap gunakan layanan kargo kontainer khusus.");
      }
    }

    // 5. Mandatory Flaw Disclosure Rule (PRD 7.2.1)
    // Non-LIKE_NEW items MUST declare flaws with photos and descriptions
    if (input.conditionTier !== "LIKE_NEW") {
      if (!input.flawInfo) {
        errors.push(
          `Kondisi ${input.conditionTier} mewajibkan transparansi cacat fisik (foto lecet/noda dan deskripsi).`
        );
      } else {
        if (!input.flawInfo.description || input.flawInfo.description.trim().length < 10) {
          errors.push(
            "Untuk kondisi preloved (selain Seperti Baru), Anda wajib menjelaskan kondisi minus/cacat secara jujur minimal 10 karakter."
          );
        }
        if (!input.flawInfo.flawImages || input.flawInfo.flawImages.length === 0) {
          errors.push(
            "Wajib melampirkan minimal 1 foto detail minus/cacat fisik (close-up lecet, robekan, atau noda)."
          );
        }
      }
    }

    // 6. Primary Image validation
    if (!input.images || input.images.length === 0) {
      errors.push("Wajib mengunggah minimal 1 foto utama produk asli perabot Anda.");
    }

    // 7. Location validation (Jabodetabek pilot)
    const isJabodetabek = VALID_JABODETABEK_CITIES.some(city =>
      input.city?.toLowerCase().includes(city.toLowerCase()) ||
      input.location?.toLowerCase().includes(city.toLowerCase())
    );
    if (!isJabodetabek) {
      warnings.push("Saat ini Attic baru beroperasi di area Jabodetabek. Penjemputan ke luar kota mungkin belum didukung armada kargo.");
    }

    // 8. Calculate Financial Breakdown (5% commission)
    const platformFee = Math.round(input.price * this.PLATFORM_FEE_PERCENT);
    const sellerEstimatedPayout = input.price - platformFee;

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      calculatedFees: {
        price: input.price,
        platformCommissionRate: this.PLATFORM_FEE_PERCENT,
        platformFee,
        sellerEstimatedPayout,
      },
    };
  }
}
