# DESIGN SYSTEM: Attic — Simple Preloved Marketplace

Dokumen sistem desain dan panduan gaya visual untuk marketplace furnitur preloved & vintage **Attic** (varian gaya simpel, praktis, dan ramah pengguna).

---

## 1. Brand Identity & Overview

- **Brand Name**: Attic
- **Tagline / Value Prop**: *Jual-Beli Furnitur Preloved & Vintage Lebih Mudah*
- **Personality**: Clean, trustworthy, accessible, modern yet subtly refined.
- **Design Philosophy**: Menggabungkan kesederhanaan browsing marketplace modern (terinspirasi dari alur praktis C2C) dengan sentuhan kurasi interior yang terpercaya.

---

## 2. Color Palette (Tokens)

Sistem warna mengedepankan latar belakang terang (*light mode*), teks kontras tinggi, serta aksen biru yang harmonis menggantikan aksen hijau mencolok agar tetap tenang dan profesional.

| Token Key | Hex Value | Peran & Penggunaan |
|---|---|---|
| `surface` | `#FFFFFF` | Background utama halaman dan kartu |
| `surface-dim` | `#F8F9FD` | Background section sekunder / bar filter |
| `surface-container-low` | `#EFF4FC` | Banner CTA sekunder & soft highlight container |
| `primary` | `#0B192C` | Deep Architectural Navy — Brand logo, tombol utama, headline besar |
| `primary-hover` | `#1A2E4B` | State hover untuk elemen primary |
| `secondary` | `#0060A8` | Mid-tone Royal Blue — Aksen ikon, link interaktif, badge status nego |
| `secondary-container` | `#E3F0FF` | Background badge "Bisa Nego" dan lingkaran ikon langkah |
| `text-primary` | `#0F172A` | Slate 900 — Teks judul, nama produk, harga utama |
| `text-secondary` | `#475569` | Slate 600 — Deskripsi, label lokasi, sub-headline |
| `text-muted` | `#94A3B8` | Slate 400 — Harga coret (diskon), placeholder input |
| `border-subtle` | `#E2E8F0` | Slate 200 — Garis pemisah, border input search, border kartu |
| `badge-condition-bg` | `rgba(15, 23, 42, 0.75)` | Badge overlay kondisi di atas foto (*Mulus 95%*, *Like New*) |

---

## 3. Typography System

- **Primary Font Family**: `Plus Jakarta Sans`, sans-serif (alternatif: `Inter`, `-apple-system`)
- **Rendering & Readability**: Kerning rapat alami, clean geometry, cocok untuk UI marketplace padat informasi.

### Type Scale

| Tingkat / Role | Ukuran & Weight | Line Height | Contoh Penggunaan |
|---|---|---|---|
| **Display / Hero H1** | `2.25rem - 2.5rem (36px - 40px)` / SemiBold (600) | `1.25` | Tajuk utama banner hero |
| **Section Title H2** | `1.5rem (24px)` / SemiBold (600) | `1.3` | Judul section (*Cara pakai Attic*, *Hot items*) |
| **Card Title H3** | `1.0rem (16px)` / Medium (500) - SemiBold (600) | `1.4` | Nama produk katalog |
| **Price Large** | `1.125rem (18px)` / Bold (700) | `1.2` | Harga jual produk saat ini |
| **Price Strike** | `0.875rem (14px)` / Regular (400) | `1.2` | Harga retail/awal yang dicoret |
| **Body Base** | `0.9375rem (15px)` / Regular (400) | `1.6` | Sub-teks hero, deskripsi fitur |
| **Body Small / Meta** | `0.8125rem (13px)` / Regular (400) - Medium (500) | `1.4` | Lokasi seller, label langkah cara jualan |
| **Caption / Badge** | `0.6875rem - 0.75rem (11px - 12px)` / SemiBold (600) | `1.0` | Badge kondisi barang, tag "Bisa Nego" |

---

## 4. Spacing, Elevation & Radius

### Corner Radius (Roundness)
- **Tag & Badge**: `rounded-full` (9999px) — Pill badges untuk filter kategori & status nego.
- **Search Bar & Action Button**: `rounded-full` — Memberikan sentuhan ramah dan mudah ditekan.
- **Card & Banner**: `rounded-2xl` (16px) — Kartu produk, banner hero, container CTA penjual.
- **Icon Circles**: `rounded-full` (`w-16 h-16` / 64px) — Lingkaran panduan langkah pemula.

### Shadows & Elevation
- **Card Default**: `shadow-sm` (`0 1px 2px rgba(0,0,0,0.04)`) dengan border `1px solid #E2E8F0`.
- **Card Hover**: `shadow-md` (`0 8px 16px -4px rgba(11,25,44,0.08)`) dengan translate sedikit ke atas (`-translate-y-1`).
- **Floating Header**: Flat dengan border bawah halus `border-b border-slate-200` atau `shadow-xs`.

---

## 5. UI Component Specs

### 1. Global Navigation Bar
- Tinggi: `72px`
- Komponen: Logo monoid/wordmark Attic, Search input besar rounded di tengah dengan icon magnifier, CTA button pill hitam navy `+ Mulai Jualan`, ikon pesan (Chat), notifikasi, dan avatar profil pengguna.
- Sub-navigation bar: Link kategori furnitur horizontal (*Sofa & Lounge, Meja & Kursi, Lemari & Rak, Lampu & Dekor, Brand & Desainer, Promo/Sale*).

### 2. Community Hero Banner
- Background: Foto lifestyle interior bertekstur hangat dengan overlay gradien lembut.
- Copy: Headline putih kontras tinggi dengan deskripsi ringkas.
- Aksi: Tombol putih kontras `+ Mulai Berjualan` berdampingan dengan tombol sekunder transparan bergaris `Cara Kerjanya ->`.

### 3. Circular Feature Steps ("Cara Pakai Attic")
- 5 lingkaran berdiameter seragam berbalut border halus biru muda (`#EFF4FC` / `#E2E8F0`).
- Ikon bertema solid/line biru royal (`#0060A8`) yang ramah pengguna:
  1. *Cara jualan* (Kamera)
  2. *Cara belanja* (Tas belanja)
  3. *Proses kirim* (Truk kurir pick-up)
  4. *100% Aman* (Proteksi rekber)
  5. *Nego harga* (Chat tawar-menawar)

### 4. Product Catalog Card ("Hot items")
- Rasio foto: `4:3` atau `1:1` square dengan corner `rounded-t-2xl` overflow-hidden.
- Float Elements: Badge kondisi di kiri atas (*e.g. Mulus 95%*) dan tombol wishlist love di kanan atas.
- Info Hierarki:
  - Brand & Lokasi seller (*e.g. IKEA Landskrona • Jaksel*)
  - Nama model furnitur (*e.g. Sofa 2-Seater Scandinavian Cream*)
  - Baris harga: Harga tebal utama + Harga coret pembanding + Badge pill *"Bisa Nego"*.

### 5. Seller Conversion Banner
- Background: Soft tinted blue container (`#EFF4FC`).
- Konten: Headline persuasif *"Punya sofa atau meja yang sudah tidak terpakai?"* dilengkapi bullet icon centang biru (*0% Biaya Tayang, Jemput ke Lokasi, Dana Cair Cepat*).
- CTA: Tombol solid navy `Pasang Iklan Sekarang — Gratis` dengan sub-keterangan waktu `Hanya butuh 2 menit untuk tayang`.

---

## 6. Iconography & Assets
- **Style**: Line icons dengan stroke 1.75px - 2px, sudut membulat (*rounded stroke caps*).
- **Tone**: Lugas, fungsional, dan bebas warna berlebihan (fokus dominan biru Slate dan Royal Blue).
