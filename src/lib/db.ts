// Attic Database Client & Data Access Layer
// Supports typed queries matching prisma/schema.prisma

import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/data/mockData";
import { MOCK_DISPUTES, MOCK_SHIPMENTS, MOCK_PENDING_LISTINGS } from "@/data/adminMockData";

export interface DBUser {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  phoneVerified: boolean;
  role: "BUYER" | "SELLER" | "ADMIN" | "LOGISTICS_PARTNER";
  sellerWalletBalance: number;
  avatarUrl?: string;
}

export const SEED_USERS: DBUser[] = [
  {
    id: "user-buyer-1",
    name: "Rian Hendrawan",
    email: "rian.buyer@attic.id",
    phoneNumber: "081234567890",
    phoneVerified: true,
    role: "BUYER",
    sellerWalletBalance: 0,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "user-seller-1",
    name: "Dian Sastro",
    email: "dian.seller@attic.id",
    phoneNumber: "081298765432",
    phoneVerified: true,
    role: "SELLER",
    sellerWalletBalance: 4850000,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "user-admin-1",
    name: "Admin Attic Jabodetabek",
    email: "admin@attic.id",
    phoneNumber: "081100112233",
    phoneVerified: true,
    role: "ADMIN",
    sellerWalletBalance: 0,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

export class AtticDB {
  static getUsers() {
    return SEED_USERS;
  }

  static getCategories() {
    return MOCK_CATEGORIES;
  }

  static getListings() {
    return MOCK_PRODUCTS;
  }

  static getListingById(id: string) {
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  }

  static getPendingModerationListings() {
    return MOCK_PENDING_LISTINGS;
  }

  static getDisputeTickets() {
    return MOCK_DISPUTES;
  }

  static getActiveShipments() {
    return MOCK_SHIPMENTS;
  }
}
