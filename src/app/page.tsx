"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CircularSteps } from "@/components/home/CircularSteps";
import { CategoryFilterPills } from "@/components/catalog/CategoryFilterPills";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SellerBanner } from "@/components/home/SellerBanner";
import { ValuePillars } from "@/components/home/ValuePillars";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import { SellerListingModal } from "@/components/seller/SellerListingModal";
import { SellerVerificationModal } from "@/components/seller/SellerVerificationModal";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { OrderTrackingModal } from "@/components/tracking/OrderTrackingModal";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { ProductItem } from "@/types";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductItem[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal States
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<ProductItem | null>(null);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isSellerVerificationOpen, setIsSellerVerificationOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any | null>(null);

  const handleStartSelling = () => {
    if (!user) {
      router.push("/login?redirect=sell");
      return;
    }
    if (!user.isSellerVerified) {
      setIsSellerVerificationOpen(true);
      return;
    }
    setIsSellerModalOpen(true);
  };

  const handleAddNewListing = (newProduct: ProductItem) => {
    setProducts([newProduct, ...products]);
    alert("Iklan furnitur berhasil ditayangkan dan langsung muncul di katalog!");
  };

  const handleOrderSuccess = (orderData: any) => {
    setActiveOrder(orderData);
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("cara-pakai");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* 1. Global Navigation Bar */}
      <Navbar
        onOpenSellerModal={handleStartSelling}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 2. Hero Banner */}
      <HeroBanner
        onStartSelling={handleStartSelling}
        onHowItWorksClick={scrollToHowItWorks}
      />

      {/* 3. Cara Pakai Attic (5 Circular Steps) */}
      <CircularSteps />

      {/* 4. Horizontal Category Icon Pills */}
      <CategoryFilterPills
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 5. Hot items Catalog Grid */}
      <ProductGrid
        products={products}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onSelectProduct={(product) => setActiveProduct(product)}
      />

      {/* 6. Seller Conversion Banner */}
      <SellerBanner onStartSelling={handleStartSelling} />

      {/* 7. 4 Value Pillars */}
      <ValuePillars />

      {/* 8. White Minimalist Footer */}
      <Footer />

      {/* Interactive Flow Modals */}
      {activeProduct && (
        <ProductDetailModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onProceedToCheckout={(prod) => {
            setActiveProduct(null);
            setCheckoutProduct(prod);
          }}
        />
      )}

      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
          onOrderSuccess={(orderData) => {
            setCheckoutProduct(null);
            handleOrderSuccess(orderData);
          }}
        />
      )}

      {isSellerVerificationOpen && (
        <SellerVerificationModal
          isOpen={isSellerVerificationOpen}
          onClose={() => setIsSellerVerificationOpen(false)}
          onVerificationSuccess={() => {
            setIsSellerVerificationOpen(false);
            setIsSellerModalOpen(true);
          }}
        />
      )}

      {isSellerModalOpen && (
        <SellerListingModal
          isOpen={isSellerModalOpen}
          onClose={() => setIsSellerModalOpen(false)}
          onSuccess={handleAddNewListing}
        />
      )}

      {activeOrder && (
        <OrderTrackingModal
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}
    </main>
  );
}
