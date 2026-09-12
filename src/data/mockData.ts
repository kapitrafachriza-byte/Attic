import { ProductItem } from "@/types";

export const MOCK_CATEGORIES = [
  { id: "all", label: "Semua Kategori", count: 24 },
  { id: "seating", label: "Sofa & Kursi", count: 8 },
  { id: "tables", label: "Meja & Kerja", count: 6 },
  { id: "storage", label: "Lemari & Rak", count: 5 },
  { id: "beds", label: "Kamar & Kasur", count: 3 },
  { id: "decor", label: "Lampu & Dekor", count: 2 },
];

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: "attic-101",
    title: "Sofa 2-Seater Scandinavian Cream",
    brand: "IKEA Landskrona",
    category: "seating",
    conditionTier: "GENTLY_LOVED",
    conditionLabel: "Mulus 92%",
    price: 2450000,
    originalPrice: 4999000,
    negotiable: true,
    location: "Kebayoran Baru",
    city: "Jakarta Selatan",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493663284041-c423e66e1081?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 164,
      width: 89,
      height: 78,
      weightKg: 38,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: true,
      description: "Ada noda samar di bantalan duduk kiri bawah akibat kopi, sudah dibersihkan ringan. Busa dan rangka masih sangat padat.",
      flawImages: [
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
      ]
    },
    recommendedCargo: "PICKUP_BOX",
    viewsCount: 412,
    likesCount: 38,
    seller: {
      id: "sel-01",
      name: "Dian Sastro",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
      responseTime: "< 15 menit",
      verified: true
    },
    deepCleanAvailable: true
  },
  {
    id: "attic-102",
    title: "Meja Kerja Ergonomis Solid Teak Wood",
    brand: "Custom Jepara Studio",
    category: "tables",
    conditionTier: "LIKE_NEW",
    conditionLabel: "Like New (99%)",
    price: 1850000,
    originalPrice: 3200000,
    negotiable: false,
    location: "BSD City",
    city: "Tangerang Selatan",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 140,
      width: 70,
      height: 75,
      weightKg: 28,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: false,
      flawImages: []
    },
    recommendedCargo: "VAN",
    viewsCount: 289,
    likesCount: 45,
    seller: {
      id: "sel-02",
      name: "Budi Santoso",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5.0,
      responseTime: "< 5 menit",
      verified: true
    },
    deepCleanAvailable: false
  },
  {
    id: "attic-103",
    title: "Rak Buku Minimalis & Credenza 4 Pintu",
    brand: "Dekoruma Heim",
    category: "storage",
    conditionTier: "GENTLY_LOVED",
    conditionLabel: "Mulus 88%",
    price: 1350000,
    originalPrice: 2890000,
    negotiable: true,
    location: "Kelapa Gading",
    city: "Jakarta Utara",
    imageUrl: "https://images.unsplash.com/photo-1594614271360-0ed9a573ae08?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1594614271360-0ed9a573ae08?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 120,
      width: 40,
      height: 160,
      weightKg: 42,
      isKnockdown: false
    },
    flawInfo: {
      hasFlaws: true,
      description: "Goresan halus di sisi samping kanan akibat gesekan dinding kamar saat pindahan. Tampak depan mulus total.",
      flawImages: [
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80"
      ]
    },
    recommendedCargo: "PICKUP_BAK",
    viewsCount: 310,
    likesCount: 19,
    seller: {
      id: "sel-03",
      name: "Rian Pratama",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 4.8,
      responseTime: "< 30 menit",
      verified: true
    },
    deepCleanAvailable: false
  },
  {
    id: "attic-104",
    title: "Armchair Mid-Century Retro Walnut & Fabric Mustard",
    brand: "Vintage Studio",
    category: "seating",
    conditionTier: "VINTAGE_CHARACTER",
    conditionLabel: "Vintage (Patina Asli)",
    price: 1600000,
    originalPrice: 3500000,
    negotiable: true,
    location: "Tebet",
    city: "Jakarta Selatan",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 82,
      width: 78,
      height: 85,
      weightKg: 18,
      isKnockdown: false
    },
    flawInfo: {
      hasFlaws: true,
      description: "Patina kayu alami di sandaran tangan, kain pelapis jok asli vintage masih kokoh tanpa sobekan.",
      flawImages: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80"
      ]
    },
    recommendedCargo: "VAN",
    viewsCount: 654,
    likesCount: 92,
    seller: {
      id: "sel-04",
      name: "Nadia Utami",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
      responseTime: "< 10 menit",
      verified: true
    },
    deepCleanAvailable: true
  },
  {
    id: "attic-105",
    title: "Meja Makan Bulat 4 Kursi Japandi Style",
    brand: "Informa Urban",
    category: "tables",
    conditionTier: "GENTLY_LOVED",
    conditionLabel: "Mulus 94%",
    price: 2950000,
    originalPrice: 6200000,
    negotiable: true,
    location: "Pondok Indah",
    city: "Jakarta Selatan",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 110,
      width: 110,
      height: 76,
      weightKg: 46,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: true,
      description: "Minus sangat minim: ada 1 bekas coaster samar di tepi meja, tidak mencolok.",
      flawImages: [
        "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=600&q=80"
      ]
    },
    recommendedCargo: "PICKUP_BOX",
    viewsCount: 520,
    likesCount: 61,
    seller: {
      id: "sel-05",
      name: "Ferry Wijaya",
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
      responseTime: "< 20 menit",
      verified: true
    },
    deepCleanAvailable: false
  },
  {
    id: "attic-106",
    title: "Standing Floor Lamp Arc Brass & Marble Base",
    brand: "Flos Replica Studio",
    category: "decor",
    conditionTier: "LIKE_NEW",
    conditionLabel: "Like New (98%)",
    price: 890000,
    originalPrice: 1950000,
    negotiable: false,
    location: "Grogol",
    city: "Jakarta Barat",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 90,
      width: 40,
      height: 185,
      weightKg: 14,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: false,
      flawImages: []
    },
    recommendedCargo: "VAN",
    viewsCount: 184,
    likesCount: 22,
    seller: {
      id: "sel-06",
      name: "Siti Rahma",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      rating: 5.0,
      responseTime: "< 10 menit",
      verified: true
    },
    deepCleanAvailable: false
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    id: "step-sell",
    stepNumber: "01",
    title: "Cara Jualan",
    desc: "Foto lecet jujur & isi ukuran",
    icon: "camera",
    tag: "0% Biaya Tayang"
  },
  {
    id: "step-buy",
    stepNumber: "02",
    title: "Cara Belanja",
    desc: "Cek dimensi & kondisi real",
    icon: "shoppingBag",
    tag: "Deskripsi Terbuka"
  },
  {
    id: "step-delivery",
    stepNumber: "03",
    title: "Proses Kirim",
    desc: "Kurir jemput & angkut kargo",
    icon: "truck",
    tag: "Tersedia Helper"
  },
  {
    id: "step-safety",
    stepNumber: "04",
    title: "100% Aman",
    desc: "Garansi rekber & cek 24 jam",
    icon: "shieldCheck",
    tag: "Escrow Protection"
  },
  {
    id: "step-nego",
    stepNumber: "05",
    title: "Nego Harga",
    desc: "Tawar harga nyaman via chat",
    icon: "messageSquare",
    tag: "Bisa Nego"
  }
];
