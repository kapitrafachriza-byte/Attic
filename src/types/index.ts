export type ConditionTier = 
  | "LIKE_NEW" 
  | "GENTLY_LOVED" 
  | "VINTAGE_CHARACTER" 
  | "NEEDS_DIY";

export interface Dimensions {
  length: number; // cm
  width: number;  // cm
  height: number; // cm
  weightKg?: number;
  isKnockdown: boolean;
}

export interface FlawDisclosure {
  hasFlaws: boolean;
  description?: string;
  flawImages: string[];
}

export interface ProductItem {
  id: string;
  title: string;
  brand: string;
  category: "seating" | "tables" | "storage" | "beds" | "decor";
  conditionTier: ConditionTier;
  conditionLabel: string; // e.g. "Mulus 95%", "Like New"
  price: number;
  originalPrice?: number;
  negotiable: boolean;
  location: string;
  city: string;
  imageUrl: string;
  galleryUrls: string[];
  dimensions: Dimensions;
  flawInfo: FlawDisclosure;
  recommendedCargo: "VAN" | "PICKUP_BAK" | "PICKUP_BOX" | "ENGKEL";
  viewsCount: number;
  likesCount: number;
  seller: {
    id: string;
    name: string;
    avatarUrl: string;
    rating: number;
    responseTime: string;
    verified: boolean;
  };
  deepCleanAvailable: boolean;
}

export interface FilterState {
  category: string;
  condition: string;
  city: string;
  priceMin?: number;
  priceMax?: number;
  maxLength?: number;
  maxWidth?: number;
  isNegotiable?: boolean;
}
