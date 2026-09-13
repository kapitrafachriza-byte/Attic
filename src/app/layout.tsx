import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Attic — Jual-Beli Furnitur Preloved & Vintage Lebih Mudah",
  description:
    "Marketplace furnitur preloved, vintage & refurbished terkurasi dengan jaminan kondisi fisik, proteksi escrow 24 jam, dan kurir kargo on-demand.",
};

import { ClientProviders } from "@/components/providers/ClientProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
