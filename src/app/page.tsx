"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CircularSteps } from "@/components/home/CircularSteps";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SellerBanner } from "@/components/home/SellerBanner";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import { SellerListingModal } from "@/components/seller/SellerListingModal";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { OrderTrackingModal } from "@/components/tracking/OrderTrackingModal";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { ProductItem } from "@/types";

export default function Home() {
  const [products, setProducts] = useState<ProductItem[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal States
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<ProductItem | null>(null);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any | null>(null);

  const handleAddNewListing = (newProduct: ProductItem) => {
    setProducts([newProduct, ...products]);
    alert("Iklan furnitur berhasil ditayangkan dan langsung muncul di katalog teratas!");
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
      {/* 1. Global Navigation Bar (72px) */}
      <Navbar
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 2. Community Hero Banner */}
      <HeroBanner
        onStartSelling={() => setIsSellerModalOpen(true)}
        onHowItWorksClick={scrollToHowItWorks}
      />

      {/* 3. 5 Circular Feature Steps ("Cara Pakai Attic") */}
      <CircularSteps />

      {/* 4. Product Catalog Grid ("Hot Items" & Curated Furniture) */}
      <ProductGrid
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
        onSelectProduct={(product) => setActiveProduct(product)}
        onQuickCheckout={(product) => setCheckoutProduct(product)}
      />

      {/* 5. Seller Conversion Banner */}
      <SellerBanner onStartSelling={() => setIsSellerModalOpen(true)} />

      {/* 6. Footer */}
      <Footer />

      {/* Modals for Complete Frontend Interaction */}
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
