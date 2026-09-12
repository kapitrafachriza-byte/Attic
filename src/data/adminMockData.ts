export interface PendingListing {
  id: string;
  title: string;
  sellerName: string;
  category: string;
  price: number;
  conditionTier: string;
  submittedAt: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    weightKg: number;
    isKnockdown: boolean;
  };
  flawInfo: {
    hasFlaws: boolean;
    description: string;
    flawImages: string[];
  };
  images: string[];
  status: "PENDING" | "APPROVED" | "REJECTED" | "NEEDS_REVISION";
}

export interface DisputeTicket {
  id: string;
  orderId: string;
  buyerName: string;
  sellerName: string;
  productTitle: string;
  totalEscrowAmount: number;
  reason: string;
  description: string;
  listingPhoto: string;
  buyerProofPhoto: string;
  filedAt: string;
  remainingTime: string;
  status: "OPEN" | "REFUNDED" | "RELEASED_TO_SELLER" | "PARTIAL_COMPENSATION";
}

export interface ActiveShipment {
  id: string;
  orderId: string;
  vehicleType: "VAN" | "PICKUP_BAK" | "PICKUP_BOX" | "ENGKEL";
  driverName: string;
  driverPhone: string;
  helperCount: number;
  origin: string;
  destination: string;
  status: "PICKUP_EN_ROUTE" | "LOADING" | "DELIVERY_EN_ROUTE" | "ARRIVED";
  deepCleanIncluded: boolean;
  estimatedArrival: string;
}

export const MOCK_PENDING_LISTINGS: PendingListing[] = [
  {
    id: "MOD-101",
    title: "Sofa L-Shape Fabric Scandinavian Grey",
    sellerName: "Ahmad Fauzi",
    category: "Sofa & Lounge",
    price: 3200000,
    conditionTier: "GENTLY_LOVED",
    submittedAt: "10 menit yang lalu",
    dimensions: {
      length: 210,
      width: 145,
      height: 80,
      weightKg: 48,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: true,
      description: "Ada lecet halus 3cm di kaki kayu belakang dan noda samar air di bantal dudukan kanan.",
      flawImages: [
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1493663284041-c423e66e1081?auto=format&fit=crop&w=800&q=80"
    ],
    status: "PENDING"
  },
  {
    id: "MOD-102",
    title: "Meja Belajar & Kerja Minimalis Kayu Solid",
    sellerName: "Citra Kirana",
    category: "Meja & Kursi",
    price: 1400000,
    conditionTier: "LIKE_NEW",
    submittedAt: "25 menit yang lalu",
    dimensions: {
      length: 120,
      width: 60,
      height: 75,
      weightKg: 20,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: false,
      description: "Mulus tanpa lecet, dipakai hanya 2 bulan.",
      flawImages: []
    },
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"
    ],
    status: "PENDING"
  },
  {
    id: "MOD-103",
    title: "Credenza TV Jati Vintage Mid-Century 1980",
    sellerName: "Vintage Hunter Studio",
    category: "Lemari & Rak",
    price: 3950000,
    conditionTier: "VINTAGE_CHARACTER",
    submittedAt: "45 menit yang lalu",
    dimensions: {
      length: 160,
      width: 45,
      height: 65,
      weightKg: 38,
      isKnockdown: false
    },
    flawInfo: {
      hasFlaws: true,
      description: "Patina alami pada handel kuningan dan goresan wajar di tepi sudut kanan.",
      flawImages: [
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80"
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
    ],
    status: "PENDING"
  }
];

export const MOCK_DISPUTES: DisputeTicket[] = [
  {
    id: "DISP-8921",
    orderId: "ATC-481920",
    buyerName: "Rian Hendrawan",
    sellerName: "Dian Sastro",
    productTitle: "Sofa 2-Seater Scandinavian Cream",
    totalEscrowAmount: 2670000,
    reason: "DEFECT_NOT_DISCLOSED",
    description: "Terdapat sobekan kain 4cm di lipatan sandaran lengan kiri yang tidak dicantumkan di foto lecet ataupun deskripsi iklan.",
    listingPhoto: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    buyerProofPhoto: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    filedAt: "2 jam yang lalu",
    remainingTime: "21 jam 45 menit",
    status: "OPEN"
  },
  {
    id: "DISP-8922",
    orderId: "ATC-391024",
    buyerName: "Maya Safitri",
    sellerName: "Ferry Wijaya",
    productTitle: "Meja Makan Bulat Marmer D:110cm",
    totalEscrowAmount: 4120000,
    reason: "DAMAGE_IN_TRANSIT",
    description: "Tepi marmer terkelupas retak kecil saat helper menurunkan barang di tangga darurat apartemen.",
    listingPhoto: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    buyerProofPhoto: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
    filedAt: "5 jam yang lalu",
    remainingTime: "18 jam 20 menit",
    status: "OPEN"
  }
];

export const MOCK_SHIPMENTS: ActiveShipment[] = [
  {
    id: "SHIP-101",
    orderId: "ATC-771290",
    vehicleType: "PICKUP_BOX",
    driverName: "Pak Joko (Lalamove Partner)",
    driverPhone: "0812-8821-9901",
    helperCount: 2,
    origin: "Kebayoran Baru, Jaksel (Lt. 3)",
    destination: "Dharmawangsa, Jaksel (Rumah)",
    status: "DELIVERY_EN_ROUTE",
    deepCleanIncluded: true,
    estimatedArrival: "15 menit lagi (14:30 WIB)"
  },
  {
    id: "SHIP-102",
    orderId: "ATC-771291",
    vehicleType: "VAN",
    driverName: "Pak Supri",
    driverPhone: "0813-1122-3344",
    helperCount: 1,
    origin: "BSD City, Tangsel",
    destination: "Bintaro Sektor 9",
    status: "LOADING",
    deepCleanIncluded: false,
    estimatedArrival: "35 menit lagi (14:50 WIB)"
  },
  {
    id: "SHIP-103",
    orderId: "ATC-771292",
    vehicleType: "ENGKEL",
    driverName: "Pak Bambang Kargo",
    driverPhone: "0811-9988-7766",
    helperCount: 2,
    origin: "Kelapa Gading, Jakut (Apartemen Lt. 12)",
    destination: "Kemang, Jaksel",
    status: "PICKUP_EN_ROUTE",
    deepCleanIncluded: false,
    estimatedArrival: "Penjemputan 15:15 WIB"
  }
];
