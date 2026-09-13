// Attic Database Client & In-Memory Data Access Layer
// Matches prisma/schema.prisma models with runtime state persistence

import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/data/mockData";
import {
  MOCK_DISPUTES,
  MOCK_SHIPMENTS,
  MOCK_PENDING_LISTINGS,
  DisputeTicket,
  ActiveShipment,
  PendingListing,
} from "@/data/adminMockData";
import { ProductItem } from "@/types";
import { EscrowStatus, EscrowFinancials, EscrowService } from "@/services/escrowService";
import { CargoEngine } from "@/services/cargoEngine";

export interface DBUser {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  phoneVerified: boolean;
  role: "BUYER" | "SELLER" | "ADMIN" | "LOGISTICS_PARTNER";
  sellerWalletBalance: number;
  avatarUrl?: string;
}

export interface DBOrder {
  id: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  product: ProductItem;
  status: EscrowStatus;
  financials: EscrowFinancials;
  destinationAddress: {
    receiverName: string;
    phone: string;
    street: string;
    city: string;
    isApartment: boolean;
    floorLevel: number;
    hasServiceElevator: boolean;
  };
  cargoDetails: {
    vehicleType: string;
    cbm: number;
    helperCount: number;
    deepCleanIncluded: boolean;
  };
  shipmentId?: string;
  inspectionDeadline?: string; // ISO string
  createdAt: string;
  deliveredAt?: string;
  releasedAt?: string;
}

// Global persistent state container (prevents reset during Next.js Turbopack HMR)
const globalStore = globalThis as unknown as {
  __atticListings?: ProductItem[];
  __atticPendingListings?: PendingListing[];
  __atticDisputes?: DisputeTicket[];
  __atticShipments?: ActiveShipment[];
  __atticUsers?: DBUser[];
  __atticOrders?: DBOrder[];
  __atticOtps?: Record<string, string>;
};

if (!globalStore.__atticListings) {
  globalStore.__atticListings = [...MOCK_PRODUCTS];
}

if (!globalStore.__atticPendingListings) {
  globalStore.__atticPendingListings = [...MOCK_PENDING_LISTINGS];
}

if (!globalStore.__atticDisputes) {
  globalStore.__atticDisputes = [...MOCK_DISPUTES];
}

if (!globalStore.__atticShipments) {
  globalStore.__atticShipments = [...MOCK_SHIPMENTS];
}

export const SEED_USERS: DBUser[] = [
  {
    id: "user-buyer-1",
    name: "Rian Hendrawan",
    email: "rian.buyer@attic.id",
    phoneNumber: "081234567890",
    password: "password123",
    phoneVerified: true,
    role: "BUYER",
    sellerWalletBalance: 0,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "user-seller-1",
    name: "Dian Sastro",
    email: "dian.seller@attic.id",
    phoneNumber: "081298765432",
    password: "password123",
    phoneVerified: true,
    role: "SELLER",
    sellerWalletBalance: 4850000,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "user-admin-1",
    name: "Admin Attic Jabodetabek",
    email: "admin@attic.id",
    phoneNumber: "081100112233",
    password: "password123",
    phoneVerified: true,
    role: "ADMIN",
    sellerWalletBalance: 0,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  },
];

if (!globalStore.__atticUsers) {
  globalStore.__atticUsers = [...SEED_USERS];
}

if (!globalStore.__atticOrders) {
  // Pre-seed an active order in inspection window
  const sofaProduct = MOCK_PRODUCTS[0];
  const now = new Date();
  const deliveryTime = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
  const deadline = EscrowService.generateInspectionDeadline(deliveryTime);

  const financials = EscrowService.calculateFinancials({
    productPrice: sofaProduct.price,
    logisticsFee: 145000,
    helperFee: 80000,
    deepCleanFee: 150000,
  });

  globalStore.__atticOrders = [
    {
      id: "ATC-481920",
      buyerId: "user-buyer-1",
      sellerId: "user-seller-1",
      productId: sofaProduct.id,
      product: sofaProduct,
      status: "DELIVERED_INSPECTION",
      financials,
      destinationAddress: {
        receiverName: "Rian Hendrawan",
        phone: "081234567890",
        street: "Jl. Senopati No. 42",
        city: "Jakarta Selatan",
        isApartment: true,
        floorLevel: 3,
        hasServiceElevator: true,
      },
      cargoDetails: {
        vehicleType: "PICKUP_BOX",
        cbm: 1.45,
        helperCount: 1,
        deepCleanIncluded: true,
      },
      shipmentId: "SHIP-101",
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      deliveredAt: deliveryTime.toISOString(),
      inspectionDeadline: deadline.toISOString(),
    },
  ];
}

export class AtticDB {
  // --- USERS & WALLETS ---
  static getUsers(): DBUser[] {
    return globalStore.__atticUsers!;
  }

  static getUserById(id: string): DBUser | undefined {
    return globalStore.__atticUsers!.find((u) => u.id === id);
  }

  static findUserByIdentifier(identifier: string): DBUser | undefined {
    const cleanId = identifier.trim().toLowerCase();
    const cleanDigits = identifier.replace(/\D/g, "");

    return globalStore.__atticUsers!.find((u) => {
      if (u.email.toLowerCase() === cleanId) return true;
      if (u.phoneNumber) {
        const uDigits = u.phoneNumber.replace(/\D/g, "");
        if (
          (cleanDigits.length >= 8 && uDigits === cleanDigits) ||
          (cleanDigits.length >= 8 && uDigits.endsWith(cleanDigits)) ||
          (cleanDigits.length >= 8 && cleanDigits.endsWith(uDigits))
        ) {
          return true;
        }
      }
      return false;
    });
  }

  static createUser(userData: {
    name: string;
    email: string;
    phoneNumber?: string;
    password?: string;
    role?: "BUYER" | "SELLER" | "ADMIN";
  }): DBUser {
    const newUser: DBUser = {
      id: `user-${Date.now().toString().slice(-6)}`,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password || "password123",
      phoneVerified: true,
      role: userData.role || "BUYER",
      sellerWalletBalance: 0,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    };
    globalStore.__atticUsers!.unshift(newUser);
    return newUser;
  }

  static saveOtp(phone: string, otp: string): void {
    if (!globalStore.__atticOtps) globalStore.__atticOtps = {};
    const digits = phone.replace(/\D/g, "");
    globalStore.__atticOtps[digits] = otp;
  }

  static verifyOtp(phone: string, otp: string): boolean {
    if (!globalStore.__atticOtps) globalStore.__atticOtps = {};
    const digits = phone.replace(/\D/g, "");
    const saved = globalStore.__atticOtps[digits];
    // Exact OTP match, or master sandbox OTP "1234" in development only
    const isSandboxBypass = process.env.NODE_ENV !== "production" && otp === "1234";
    return saved === otp || isSandboxBypass;
  }

  static updateSellerWallet(userId: string, deltaAmount: number): number {
    const user = globalStore.__atticUsers!.find((u) => u.id === userId);
    if (user) {
      user.sellerWalletBalance += deltaAmount;
      return user.sellerWalletBalance;
    }
    return 0;
  }

  // --- CATEGORIES ---
  static getCategories() {
    return MOCK_CATEGORIES;
  }

  // --- LISTINGS ---
  static getListings(): ProductItem[] {
    return globalStore.__atticListings!;
  }

  static getListingById(id: string): ProductItem | undefined {
    return globalStore.__atticListings!.find((p) => p.id === id);
  }

  static addListing(listing: ProductItem): void {
    globalStore.__atticListings!.unshift(listing);
  }

  // --- PENDING MODERATION ---
  static getPendingModerationListings(): PendingListing[] {
    return globalStore.__atticPendingListings!;
  }

  static addPendingListing(item: PendingListing): void {
    globalStore.__atticPendingListings!.unshift(item);
  }

  static moderateListing(
    id: string,
    status: "APPROVED" | "REJECTED" | "NEEDS_REVISION"
  ): PendingListing | null {
    const listingIndex = globalStore.__atticPendingListings!.findIndex((l) => l.id === id);
    if (listingIndex === -1) return null;

    const listing = globalStore.__atticPendingListings![listingIndex];
    listing.status = status;

    if (status === "APPROVED") {
      // Add to public listings
      const vehicle = CargoEngine.determineVehicle(
        listing.dimensions.length,
        listing.dimensions.width,
        listing.dimensions.height,
        listing.dimensions.weightKg
      );

      const approvedProduct: ProductItem = {
        id: `PROD-${Date.now()}`,
        title: listing.title,
        brand: "Original",
        category: listing.category.toLowerCase().includes("sofa")
          ? "seating"
          : listing.category.toLowerCase().includes("meja")
          ? "tables"
          : "storage",
        conditionTier: listing.conditionTier as any,
        conditionLabel:
          listing.conditionTier === "LIKE_NEW"
            ? "Mulus 99%"
            : listing.conditionTier === "GENTLY_LOVED"
            ? "Mulus 90%"
            : "Vintage Utuh",
        price: listing.price,
        originalPrice: Math.round(listing.price * 1.5),
        negotiable: true,
        location: "Jabodetabek",
        city: "Jakarta Selatan",
        imageUrl: listing.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        galleryUrls: listing.images,
        dimensions: listing.dimensions,
        flawInfo: listing.flawInfo,
        recommendedCargo: vehicle.vehicle,
        viewsCount: 1,
        likesCount: 0,
        seller: {
          id: "user-seller-1",
          name: listing.sellerName,
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          rating: 4.9,
          responseTime: "< 15 mnt",
          verified: true,
        },
        deepCleanAvailable: true,
      };

      globalStore.__atticListings!.unshift(approvedProduct);
    }

    return listing;
  }

  // --- ORDERS & ESCROW ---
  static getOrders(): DBOrder[] {
    return globalStore.__atticOrders!;
  }

  static getOrderById(id: string): DBOrder | undefined {
    return globalStore.__atticOrders!.find((o) => o.id === id);
  }

  static createOrder(order: DBOrder): DBOrder {
    globalStore.__atticOrders!.unshift(order);
    return order;
  }

  static releaseOrderEscrow(orderId: string): { success: boolean; message: string; order?: DBOrder } {
    const order = globalStore.__atticOrders!.find((o) => o.id === orderId);
    if (!order) {
      return { success: false, message: "Pesanan tidak ditemukan." };
    }

    const check = EscrowService.canReleaseFunds({
      status: order.status,
      deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : null,
      inspectionDeadline: order.inspectionDeadline ? new Date(order.inspectionDeadline) : null,
    });

    if (!check.canRelease) {
      return { success: false, message: check.reason || "Dana tidak dapat dicairkan." };
    }

    order.status = "COMPLETED";
    order.releasedAt = new Date().toISOString();

    // Credit seller's wallet
    this.updateSellerWallet(order.sellerId, order.financials.netSellerPayout);

    return {
      success: true,
      message: `Dana sebesar Rp ${order.financials.netSellerPayout.toLocaleString(
        "id-ID"
      )} berhasil diteruskan ke saldo dompet penjual.`,
      order,
    };
  }

  // --- DISPUTES ---
  static getDisputeTickets(): DisputeTicket[] {
    return globalStore.__atticDisputes!;
  }

  static getDisputeById(id: string): DisputeTicket | undefined {
    return globalStore.__atticDisputes!.find((d) => d.id === id);
  }

  static createDisputeTicket(ticket: DisputeTicket): DisputeTicket {
    globalStore.__atticDisputes!.unshift(ticket);
    // Freeze corresponding order
    const order = globalStore.__atticOrders!.find((o) => o.id === ticket.orderId);
    if (order) {
      order.status = "DISPUTED";
    }
    return ticket;
  }

  static arbitrateDispute(
    disputeId: string,
    action: "FULL_REFUND_BUYER" | "RELEASE_TO_SELLER" | "PARTIAL_COMPENSATION",
    partialAmount: number = 0,
    adminNotes: string = ""
  ): { success: boolean; dispute: DisputeTicket; order?: DBOrder } {
    const dispute = globalStore.__atticDisputes!.find((d) => d.id === disputeId);
    if (!dispute) {
      throw new Error("Tiket sengketa tidak ditemukan.");
    }

    const order = globalStore.__atticOrders!.find((o) => o.id === dispute.orderId);

    if (action === "FULL_REFUND_BUYER") {
      dispute.status = "REFUNDED";
      if (order) order.status = "REFUNDED";
    } else if (action === "RELEASE_TO_SELLER") {
      dispute.status = "RELEASED_TO_SELLER";
      if (order) {
        order.status = "COMPLETED";
        this.updateSellerWallet(order.sellerId, order.financials.netSellerPayout);
      }
    } else if (action === "PARTIAL_COMPENSATION") {
      dispute.status = "PARTIAL_COMPENSATION";
      if (order) {
        order.status = "COMPLETED";
        const sellerPayout = Math.max(0, order.financials.netSellerPayout - partialAmount);
        this.updateSellerWallet(order.sellerId, sellerPayout);
      }
    }

    return { success: true, dispute, order };
  }

  // --- LOGISTICS & SHIPMENTS ---
  static getActiveShipments(): ActiveShipment[] {
    return globalStore.__atticShipments!;
  }

  static addShipment(shipment: ActiveShipment): void {
    globalStore.__atticShipments!.unshift(shipment);
  }
}
