-- Attic Marketplace Initial PostgreSQL Migration (DDL)
-- Generated according to PRD_Attic_Marketplace.md Section 11 specifications

-- Create Enums
CREATE TYPE "UserRole" AS ENUM ('BUYER', 'SELLER', 'ADMIN', 'LOGISTICS_PARTNER');
CREATE TYPE "ConditionTier" AS ENUM ('LIKE_NEW', 'GENTLY_LOVED', 'VINTAGE_CHARACTER', 'NEEDS_DIY');
CREATE TYPE "ListingStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'IN_ESCROW', 'SOLD', 'ARCHIVED');
CREATE TYPE "CargoType" AS ENUM ('VAN', 'PICKUP_BAK', 'PICKUP_BOX', 'ENGKEL');
CREATE TYPE "OrderStatus" AS ENUM ('WAITING_PAYMENT', 'PAID_ESCROW', 'PICKUP_SCHEDULED', 'IN_TRANSIT', 'DELIVERED', 'INSPECTION_24H', 'COMPLETED', 'DISPUTED', 'REFUNDED', 'CANCELLED');
CREATE TYPE "EscrowStatus" AS ENUM ('HOLDING', 'RELEASED_TO_SELLER', 'FROZEN_DISPUTE', 'REFUNDED_TO_BUYER', 'PARTIAL_SETTLED');
CREATE TYPE "DisputeReason" AS ENUM ('DEFECT_NOT_DISCLOSED', 'DAMAGE_IN_TRANSIT', 'WRONG_DIMENSIONS', 'OTHER');
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'INVESTIGATING', 'REFUND_FULL', 'PARTIAL_COMPENSATION', 'DISMISSED_RELEASE');
CREATE TYPE "CleaningStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- Table: users
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT,
    "phoneNumber" TEXT UNIQUE,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL DEFAULT 'BUYER',
    "sellerWalletBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: addresses
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "label" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientPhone" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "postalCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isApartment" BOOLEAN NOT NULL DEFAULT false,
    "floorLevel" INTEGER NOT NULL DEFAULT 1,
    "hasServiceElevator" BOOLEAN NOT NULL DEFAULT false,
    "staircaseWidthOk" BOOLEAN NOT NULL DEFAULT true,
    "cargoParkingAccess" BOOLEAN NOT NULL DEFAULT true,
    "accessNotes" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: categories
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "iconName" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: listings
CREATE TABLE "listings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sellerId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "categoryId" TEXT NOT NULL REFERENCES "categories"("id"),
    "title" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "conditionTier" "ConditionTier" NOT NULL DEFAULT 'GENTLY_LOVED',
    "conditionLabel" TEXT NOT NULL,
    "lengthCm" DOUBLE PRECISION NOT NULL,
    "widthCm" DOUBLE PRECISION NOT NULL,
    "heightCm" DOUBLE PRECISION NOT NULL,
    "weightKg" DOUBLE PRECISION,
    "isKnockdown" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "negotiable" BOOLEAN NOT NULL DEFAULT true,
    "status" "ListingStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "recommendedCargo" "CargoType" NOT NULL DEFAULT 'VAN',
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "deepCleanAvailable" BOOLEAN NOT NULL DEFAULT false,
    "pickupAddressId" TEXT REFERENCES "addresses"("id"),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: listing_media
CREATE TABLE "listing_media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "listingId" TEXT NOT NULL REFERENCES "listings"("id") ON DELETE CASCADE,
    "mediaUrl" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isFlawDetail" BOOLEAN NOT NULL DEFAULT false,
    "flawDescription" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: orders
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderNumber" TEXT NOT NULL UNIQUE,
    "buyerId" TEXT NOT NULL REFERENCES "users"("id"),
    "sellerId" TEXT NOT NULL REFERENCES "users"("id"),
    "listingId" TEXT NOT NULL REFERENCES "listings"("id"),
    "addressId" TEXT NOT NULL REFERENCES "addresses"("id"),
    "itemPrice" DOUBLE PRECISION NOT NULL,
    "shippingFee" DOUBLE PRECISION NOT NULL,
    "helperFee" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "deepCleanFee" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "escrowProtectionFee" DOUBLE PRECISION NOT NULL DEFAULT 25000.0,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'WAITING_PAYMENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: escrow_holds
CREATE TABLE "escrow_holds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL UNIQUE REFERENCES "orders"("id") ON DELETE CASCADE,
    "heldAmount" DOUBLE PRECISION NOT NULL,
    "status" "EscrowStatus" NOT NULL DEFAULT 'HOLDING',
    "inspectionExpiresAt" TIMESTAMP(3),
    "releasedAt" TIMESTAMP(3),
    "autoReleaseJobId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: payment_transactions
CREATE TABLE "payment_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL UNIQUE REFERENCES "orders"("id") ON DELETE CASCADE,
    "paymentMethod" TEXT NOT NULL,
    "paymentProvider" TEXT NOT NULL,
    "transactionStatus" TEXT NOT NULL,
    "paymentReference" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: logistics_shipments
CREATE TABLE "logistics_shipments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL UNIQUE REFERENCES "orders"("id") ON DELETE CASCADE,
    "vehicleType" "CargoType" NOT NULL DEFAULT 'VAN',
    "providerName" TEXT NOT NULL DEFAULT 'LALAMOVE',
    "driverName" TEXT,
    "driverPhone" TEXT,
    "helperCount" INTEGER NOT NULL DEFAULT 0,
    "pickupSlotStart" TIMESTAMP(3),
    "pickupSlotEnd" TIMESTAMP(3),
    "proofOfPickupUrl" TEXT,
    "proofOfDeliveryUrl" TEXT,
    "digitalSignatureUrl" TEXT,
    "trackingStatus" TEXT NOT NULL DEFAULT 'PICKUP_PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: shipment_events
CREATE TABLE "shipment_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shipmentId" TEXT NOT NULL REFERENCES "logistics_shipments"("id") ON DELETE CASCADE,
    "milestone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: dispute_claims
CREATE TABLE "dispute_claims" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL UNIQUE REFERENCES "orders"("id") ON DELETE CASCADE,
    "reporterId" TEXT NOT NULL REFERENCES "users"("id"),
    "reason" "DisputeReason" NOT NULL DEFAULT 'DEFECT_NOT_DISCLOSED',
    "description" TEXT NOT NULL,
    "proofImageUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "resolutionStatus" "DisputeStatus" NOT NULL DEFAULT 'OPEN',
    "compensationAmount" DOUBLE PRECISION,
    "mediatorNotes" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: cleaning_tasks
CREATE TABLE "cleaning_tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL UNIQUE REFERENCES "orders"("id") ON DELETE CASCADE,
    "partnerName" TEXT,
    "status" "CleaningStatus" NOT NULL DEFAULT 'SCHEDULED',
    "scheduledDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "proofPhotoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: review_ratings
CREATE TABLE "review_ratings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL UNIQUE REFERENCES "orders"("id") ON DELETE CASCADE,
    "reviewerId" TEXT NOT NULL REFERENCES "users"("id"),
    "revieweeId" TEXT NOT NULL REFERENCES "users"("id"),
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "conditionAccuracyScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Optimal Performance
CREATE INDEX "idx_listings_category" ON "listings"("categoryId");
CREATE INDEX "idx_listings_status" ON "listings"("status");
CREATE INDEX "idx_orders_status" ON "orders"("status");
CREATE INDEX "idx_escrow_holds_status" ON "escrow_holds"("status");
CREATE INDEX "idx_shipment_events_shipment" ON "shipment_events"("shipmentId");
