import { ProductItem } from "@/types";

export const MOCK_CATEGORIES = [
  { id: "all", label: "Semua Furnitur" },
  { id: "seating", label: "Sofa & Lounge" },
  { id: "tables", label: "Meja Makan & Kerja" },
  { id: "storage", label: "Lemari & Rak Buku" },
  { id: "decor", label: "Lampu & Dekorasi" },
  { id: "outdoor", label: "Outdoor & Teras" },
];

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: "attic-1",
    title: "Sofa 2 - Seater Scandinavian Cream",
    brand: "IKEA Landskrona",
    category: "seating",
    conditionTier: "GENTLY_LOVED",
    conditionLabel: "Mulus 95%",
    price: 2450000,
    originalPrice: 5200000,
    negotiable: true,
    location: "Kebayoran Baru",
    city: "Jaksel",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493663284041-c423e66e1081?auto=format&fit=crop&w=800&q=80"
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
      description: "Pemakaian 6 bulan wajar, busa dan pegas sangat empuk & padat.",
      flawImages: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"]
    },
    recommendedCargo: "PICKUP_BOX",
    viewsCount: 512,
    likesCount: 42,
    seller: {
      id: "sel-01",
      name: "Siska Saraswati",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
      responseTime: "< 15 menit",
      verified: true
    },
    deepCleanAvailable: true
  },
  {
    id: "attic-2",
    title: "Meja Kerja Kayu Jati Solid 140cm",
    brand: "Custom Jepara",
    category: "tables",
    conditionTier: "LIKE_NEW",
    conditionLabel: "Like New",
    price: 1850000,
    originalPrice: 3500000,
    negotiable: true,
    location: "Dago",
    city: "Bandung",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"
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
    viewsCount: 389,
    likesCount: 56,
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
    id: "attic-3",
    title: "Lounge Armchair & Ottoman Kulit",
    brand: "Herman Miller Rep",
    category: "seating",
    conditionTier: "VINTAGE_CHARACTER",
    conditionLabel: "Vintage Original",
    price: 3100000,
    originalPrice: 6800000,
    negotiable: true,
    location: "Gading Serpong",
    city: "Tangerang",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 85,
      width: 85,
      height: 84,
      weightKg: 32,
      isKnockdown: false
    },
    flawInfo: {
      hasFlaws: true,
      description: "Patina alami pada kulit asli dan kayu walnut mewah.",
      flawImages: []
    },
    recommendedCargo: "PICKUP_BAK",
    viewsCount: 820,
    likesCount: 110,
    seller: {
      id: "sel-03",
      name: "Raden Mas",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
      responseTime: "< 10 menit",
      verified: true
    },
    deepCleanAvailable: true
  },
  {
    id: "attic-4",
    title: "Rak Buku Tingkat Industrial Metal...",
    brand: "Informa Studio",
    category: "storage",
    conditionTier: "GENTLY_LOVED",
    conditionLabel: "Mulus 90%",
    price: 950000,
    originalPrice: 2100000,
    negotiable: true,
    location: "Puri Indah",
    city: "Jakbar",
    imageUrl: "https://images.unsplash.com/photo-1594614271360-0ed9a573ae08?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1594614271360-0ed9a573ae08?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 100,
      width: 35,
      height: 150,
      weightKg: 22,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: false,
      flawImages: []
    },
    recommendedCargo: "VAN",
    viewsCount: 245,
    likesCount: 30,
    seller: {
      id: "sel-04",
      name: "Larasati",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 4.8,
      responseTime: "< 20 menit",
      verified: true
    },
    deepCleanAvailable: false
  },
  {
    id: "attic-5",
    title: "Meja Makan Marmer Bulat D:110cm",
    brand: "Castlery Home",
    category: "tables",
    conditionTier: "GENTLY_LOVED",
    conditionLabel: "Mulus 98%",
    price: 3800000,
    originalPrice: 8900000,
    negotiable: true,
    location: "Pondok Indah",
    city: "Jaksel",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 110,
      width: 110,
      height: 76,
      weightKg: 55,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: false,
      flawImages: []
    },
    recommendedCargo: "PICKUP_BOX",
    viewsCount: 630,
    likesCount: 84,
    seller: {
      id: "sel-05",
      name: "Jonathan Lee",
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
      rating: 5.0,
      responseTime: "< 10 menit",
      verified: true
    },
    deepCleanAvailable: false
  },
  {
    id: "attic-6",
    title: "Buffet Credenza Walnut Retro 1970s",
    brand: "Vintage Archival",
    category: "storage",
    conditionTier: "VINTAGE_CHARACTER",
    conditionLabel: "Vintage Rare",
    price: 4250000,
    originalPrice: 9500000,
    negotiable: true,
    location: "Gubeng",
    city: "Surabaya",
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 180,
      width: 45,
      height: 78,
      weightKg: 48,
      isKnockdown: false
    },
    flawInfo: {
      hasFlaws: true,
      description: "Kayu walnut asli, engsel original 1970s berfungsi halus.",
      flawImages: []
    },
    recommendedCargo: "ENGKEL",
    viewsCount: 710,
    likesCount: 95,
    seller: {
      id: "sel-06",
      name: "Antique Vault",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
      responseTime: "< 15 menit",
      verified: true
    },
    deepCleanAvailable: false
  },
  {
    id: "attic-7",
    title: "Lampu Lantai Arch Brass Marmer",
    brand: "Arco Style",
    category: "decor",
    conditionTier: "GENTLY_LOVED",
    conditionLabel: "Mulus 95%",
    price: 750000,
    originalPrice: 1600000,
    negotiable: true,
    location: "Margonda",
    city: "Depok",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 80,
      width: 35,
      height: 180,
      weightKg: 16,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: false,
      flawImages: []
    },
    recommendedCargo: "VAN",
    viewsCount: 312,
    likesCount: 38,
    seller: {
      id: "sel-07",
      name: "Tania Putri",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
      responseTime: "< 5 menit",
      verified: true
    },
    deepCleanAvailable: false
  },
  {
    id: "attic-8",
    title: "Kursi Kerja Ergonomis Full Mesh",
    brand: "Sihoo Doro",
    category: "seating",
    conditionTier: "LIKE_NEW",
    conditionLabel: "Like New",
    price: 1150000,
    originalPrice: 2400000,
    negotiable: true,
    location: "Summarecon",
    city: "Bekasi",
    imageUrl: "https://images.unsplash.com/photo-1580481077194-48612f0cfd7f?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1580481077194-48612f0cfd7f?auto=format&fit=crop&w=800&q=80"
    ],
    dimensions: {
      length: 65,
      width: 65,
      height: 110,
      weightKg: 19,
      isKnockdown: true
    },
    flawInfo: {
      hasFlaws: false,
      flawImages: []
    },
    recommendedCargo: "VAN",
    viewsCount: 480,
    likesCount: 65,
    seller: {
      id: "sel-08",
      name: "Dimas Anggara",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
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
    title: "Cara jualan",
    desc: "Foto & pasang harga",
    icon: "camera"
  },
  {
    id: "step-buy",
    title: "Cara belanja",
    desc: "Pilih kurasi terbaik",
    icon: "shoppingBag"
  },
  {
    id: "step-delivery",
    title: "Proses kirim",
    desc: "Dijemput dari rumah",
    icon: "truck"
  },
  {
    id: "step-safety",
    title: "100% Aman",
    desc: "Garansi uang kembali",
    icon: "shieldCheck"
  },
  {
    id: "step-nego",
    title: "Nego harga",
    desc: "Tawar langsung seller",
    icon: "messageSquare"
  }
];

export const VALUE_PILLARS = [
  {
    title: "Kurasi Terpercaya",
    desc: "Setiap furnitur preloved diverifikasi kondisi, dimensi fisik, dan keasliannya sebelum tayang.",
    icon: "shieldCheck"
  },
  {
    title: "Pengiriman Aman",
    desc: "Mitra logistik spesialis furnitur bergaransi dengan penanganan perlindungan ekstra ke pintu Anda.",
    icon: "truck"
  },
  {
    title: "Rekber Garansi",
    desc: "Dana diteruskan ke penjual hanya setelah Anda menerima dan menyetujui furnitur sesuai deskripsi.",
    icon: "shieldLock"
  },
  {
    title: "Gaya Berkelanjutan",
    desc: "Dukung ekonomi sirkular dan kurangi limbah interior rumah dengan memberi kehidupan kedua.",
    icon: "recycle"
  }
];
