// Attic Bulky Cargo Recommendation Engine
// Implements volume kubikasi (CBM Calculation) & vehicle matching according to PRD 7.4.1

export type CargoVehicleType = "VAN" | "PICKUP_BAK" | "PICKUP_BOX" | "ENGKEL";

export interface CargoCalculationInput {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg?: number;
  originCity: string;
  destinationCity: string;
  isApartment?: boolean;
  floorLevel?: number;
  hasServiceElevator?: boolean;
  helperCount?: number;
  includeDeepClean?: boolean;
}

export interface CargoCalculationResult {
  cbm: number; // Volume in cubic meters (m³)
  recommendedVehicle: CargoVehicleType;
  vehicleLabel: string;
  vehicleCapacityDesc: string;
  baseCargoRate: number;
  distanceKmEstimate: number;
  helperSurcharge: number;
  deepCleanFee: number;
  escrowProtectionFee: number;
  totalLogisticsFee: number;
  requiresSpecialStairsHelper: boolean;
  notes: string[];
}

export class CargoEngine {
  /**
   * Calculates volume in Cubic Meters (CBM)
   * Formula: (Panjang cm × Lebar cm × Tinggi cm) / 1,000,000
   */
  static calculateCBM(lengthCm: number, widthCm: number, heightCm: number): number {
    const volume = (lengthCm * widthCm * heightCm) / 1000000;
    return Math.round(volume * 1000) / 1000; // 3 decimal places
  }

  /**
   * Recommends the lowest safe vehicle type based on CBM and dimensions
   */
  static determineVehicle(lengthCm: number, widthCm: number, heightCm: number, weightKg: number = 30): {
    vehicle: CargoVehicleType;
    label: string;
    desc: string;
    baseRate: number;
  } {
    const cbm = this.calculateCBM(lengthCm, widthCm, heightCm);
    const maxDimension = Math.max(lengthCm, widthCm, heightCm);

    // Rule 1: Small bulky / Compact furniture (Single chair, small desk, lamp)
    if (cbm <= 1.4 && maxDimension <= 150 && weightKg <= 120) {
      return {
        vehicle: "VAN",
        label: "Mobil Blind Van",
        desc: "Kapasitas s/d 1.4 CBM, aman dari cuaca, cocok untuk meja kecil & kursi kerja",
        baseRate: 95000,
      };
    }

    // Rule 2: Medium bulky / Open pickup (Sofa 2-seater, lemari 1 tingkat, credenza)
    if (cbm <= 2.8 && maxDimension <= 200 && weightKg <= 500) {
      return {
        vehicle: "PICKUP_BAK",
        label: "Pikap Bak Terbuka",
        desc: "Kapasitas s/d 2.8 CBM, muat sofa 2-seater & meja makan 4 kursi",
        baseRate: 120000,
      };
    }

    // Rule 3: Medium-large bulky with weather protection (Sofa kain fabric, kasur springbed, rak tinggi)
    if (cbm <= 4.2 && maxDimension <= 240 && weightKg <= 800) {
      return {
        vehicle: "PICKUP_BOX",
        label: "Pikap Boks Tertutup",
        desc: "Kapasitas s/d 4.2 CBM, terlindung hujan & debu, ideal untuk sofa fabric & kasur",
        baseRate: 145000,
      };
    }

    // Rule 4: Very large / Multi-part furniture / Heavy solid wood (Lemari 3 pintu, sofa L-shape, meja jati utuh)
    return {
      vehicle: "ENGKEL",
      label: "Truk Engkel Boks (CDE)",
      desc: "Kapasitas s/d 8.0 CBM muatan berat s/d 2 ton, cocok untuk perabot masif & sofa besar",
      baseRate: 240000,
    };
  }

  /**
   * Distance estimation in Jabodetabek based on city pairs
   */
  static estimateDistanceKm(origin: string, destination: string): number {
    if (origin.toLowerCase() === destination.toLowerCase()) {
      return 12; // Dalam kota yang sama (rata-rata 12 km)
    }

    // Antar wilayah Jabodetabek
    const combined = `${origin}-${destination}`.toLowerCase();
    if (combined.includes("tangerang") || combined.includes("bsd")) return 28;
    if (combined.includes("bekasi")) return 32;
    if (combined.includes("depok")) return 24;
    return 18;
  }

  /**
   * Complete calculation including building access, helper surcharge, and add-ons
   */
  static calculateLogistics(input: CargoCalculationInput): CargoCalculationResult {
    const cbm = this.calculateCBM(input.lengthCm, input.widthCm, input.heightCm);
    const weight = input.weightKg || 30;
    const vehicleInfo = this.determineVehicle(input.lengthCm, input.widthCm, input.heightCm, weight);
    const distanceKm = this.estimateDistanceKm(input.originCity, input.destinationCity);

    // Dynamic distance fee (Rp 3.500 per km di atas 10 km)
    const extraDistanceKm = Math.max(0, distanceKm - 10);
    const distanceSurcharge = extraDistanceKm * 3500;
    const baseCargoRate = vehicleInfo.baseRate + distanceSurcharge;

    // Helper Surcharge Calculation (PRD 7.4.4)
    let helperSurcharge = 0;
    const helperCount = input.helperCount || 0;
    if (helperCount === 1) {
      helperSurcharge = 80000;
    } else if (helperCount >= 2) {
      helperSurcharge = 150000;
    }

    // High-rise stairs penalty if apartment without elevator
    let requiresSpecialStairsHelper = false;
    const floor = input.floorLevel || 1;
    if (input.isApartment && !input.hasServiceElevator && floor > 2) {
      requiresSpecialStairsHelper = true;
      helperSurcharge += (floor - 2) * 20000; // Tambahan biaya tangga per lantai
    }

    // Deep Cleaning Add-on
    const deepCleanFee = input.includeDeepClean ? 150000 : 0;
    const escrowProtectionFee = 25000; // Biaya garansi rekber Attic tetap

    const totalLogisticsFee = baseCargoRate + helperSurcharge + deepCleanFee + escrowProtectionFee;

    const notes: string[] = [];
    if (requiresSpecialStairsHelper) {
      notes.push(`Apartemen lantai ${floor} tanpa lift barang: Dikenakan penyesuaian biaya angkut tangga manual.`);
    }
    if (input.includeDeepClean) {
      notes.push("Layanan Professional Deep Cleaning uap sanitasi aktif.");
    }

    return {
      cbm,
      recommendedVehicle: vehicleInfo.vehicle,
      vehicleLabel: vehicleInfo.label,
      vehicleCapacityDesc: vehicleInfo.desc,
      baseCargoRate: Math.round(baseCargoRate),
      distanceKmEstimate: distanceKm,
      helperSurcharge,
      deepCleanFee,
      escrowProtectionFee,
      totalLogisticsFee: Math.round(totalLogisticsFee),
      requiresSpecialStairsHelper,
      notes,
    };
  }
}
