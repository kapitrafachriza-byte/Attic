# Product Requirements Document (PRD)
# Platform Marketplace Furnitur Pre-Loved: Attic

| | |
|---|---|
| **Versi Dokumen** | 1.0 (Comprehensive MVP Specification) |
| **Tanggal** | 12 September 2026 |
| **Disusun oleh** | Product & Engineering Team Attic |
| **Status** | Final Draft — Siap Direview untuk Sprint Backlog & UI/UX Design |
| **Target Rilis** | Q4 2026 (Fase MVP Pilot — Jabodetabek) |

---

## 1. Ringkasan Eksekutif

**Attic** adalah platform *e-commerce marketplace* C2C (*Customer-to-Customer*) dan B2C (*Curated Seller*) terkurasi yang dirancang khusus untuk memfasilitasi transaksi jual-beli furnitur bekas (*pre-loved*, *vintage*, dan *refurbished*). 

Transaksi furnitur bekas saat ini sangat rumit karena tiga masalah mendasar:
1. **Ketidakpastian kondisi fisik dan kebersihan barang**,
2. **Ketiadaan solusi logistik muatan besar (*bulky cargo*) yang terintegrasi dan transparan**, serta
3. **Risiko penipuan (*scam*) dan transaksi langsung yang tidak aman**.

Attic hadir sebagai portal menyeluruh (*end-to-end platform*) yang mengintegrasikan:
- Standarisasi kurasi dan grading kondisi barang (*Tiered Condition Rating*),
- Sistem proteksi pembayaran bersama (*Escrow Payment Protection*),
- Mesin kalkulasi dan pesanan logistik kargo *on-demand* otomatis (lengkap dengan opsi tenaga bongkar muat / *helper*), dan
- Layanan nilai tambah kebersihan (*Add-on Professional Deep Cleaning & Sanitization*).

Dokumen ini mendefinisikan seluruh kebutuhan produk, alur pengguna, model data, prioritas fungsional (MoSCoW), tata kelola peran (*role-based access*), hingga mitigasi risiko agar tim Engineering, UI/UX, Operasional Logistik, dan Bisnis memiliki acuan pengembangan yang selaras.

---

## 2. Latar Belakang & Masalah yang Diselesaikan

Di kawasan perkotaan dengan mobilitas residensial tinggi (apartemen sewa, kos mahasiswa, kepindahan rumah pertama), permintaan terhadap furnitur estetik terjangkau dan pelepasan barang bekas sangat masif. Namun, platform iklan baris (*classified ads*) umum seperti OLX, Facebook Marketplace, atau forum media sosial memiliki friksi parah:

- **Ghosting dan Negosiasi Melelahkan:** Penjual kelelahan melayani calon pembeli yang menawar tanpa kejelasan atau menghilang saat jadwal pengambilan.
- **Beban Logistik Lepas Tangan:** Platform konvensional menyerahkan urusan angkut barang sepenuhnya kepada pengguna. Pengguna awam kesulitan mencari armada pikap/truk, tidak tahu estimasi tarif wajar, dan terkendala tenaga angkut barang berat di lantai bertingkat/apartemen tanpa lift barang.
- **Kondisi Tidak Akurat & Asimetri Informasi:** Foto barang sering menipu sudut pandang, cacat disembunyikan, dan dimensi tidak presisi sehingga barang tidak muat saat tiba di pintu ruangan pembeli.
- **Kekhawatiran Higiene:** Pembeli enggan membeli furnitur bermaterial kain/busa (sofa, kasur, kursi kerja) karena risiko tungau, kuman, dan noda tersembunyi.
- **Risiko Keamanan Finansial:** Pembayaran transfer langsung sebelum barang tiba rawan penipuan, sedangkan metode COD (*Cash on Delivery*) furnitur berat sangat merepotkan bila terjadi pembatalan sepihak di lokasi.

Attic dirancang secara vertikal (*vertical marketplace*) untuk melenyapkan setiap friksi tersebut ke dalam satu sistem terorkestrasi.

---

## 3. Tujuan Produk

### 3.1 Tujuan Bisnis
- **Market Liquidity:** Memastikan rata-rata durasi barang terjual (*listing-to-sold*) di bawah 21 hari untuk kategori utama (meja, kursi kerja, rak, credenza).
- **Rasio Sengketa Rendah:** Menjaga angka sengketa (*dispute rate*) ketidaksesuaian barang di bawah 3% dari total transaksi terselesaikan.
- **Penyelesaian Logistik Tepat Waktu:** Mencapai tingkat keberhasilan pengiriman (*delivery fulfillment rate*) di atas 96% sesuai jadwal slot yang disepakati.
- **Revenue Stream Berkelanjutan:** Menghasilkan monetisasi dari biaya layanan transaksi (*take rate* 8–12%), selisih tarif logistik kargo, biaya layanan pembersihan, dan *listing boost*.

### 3.2 Tujuan Pengguna
- **Penjual (Seller):** Dapat menjual perabot dalam hitungan klik dengan panduan listing terstandar tanpa perlu repot mencarikan kurir kargo atau memanggul sendiri barang berat keluar unit hunian.
- **Pembeli (Buyer):** Memperoleh furnitur berkualitas dengan jaminan deskripsi transparan, biaya ongkir kargo transparan langsung di halaman *checkout*, perlindungan uang kembali via *escrow*, serta opsi furnitur tiba dalam kondisi higienis/sudah dicuci.

### 3.3 Batasan Ruang Lingkup MVP (Non-Goals / Out of Scope)
- **Aplikasi Mobile Native (iOS / Android):** Fokus MVP adalah aplikasi web responsif (*mobile-first Progressive Web App*) berkinerja tinggi.
- **In-Browser WebAR Real-Time Placement:** Fitur proyeksi visual kamera AR disiapkan untuk Fase 2 setelah likuiditas transaksi pilot Jabodetabek tercapai.
- **Gudang Konsinyasi Sentral (Self-operated Warehousing):** MVP beroperasi secara P2P murni (*point-to-point delivery* langsung dari rumah penjual ke rumah pembeli) tanpa penyimpanan gudang Attic.
- **Ekspedisi Antarpulau:** Operasional awal dibatasi pada wilayah metropolitan Jabodetabek demi menjaga SLA pengiriman kargo instan/terjadwal.

---

## 4. Target Pengguna & Persona

| Persona | Deskripsi & Profil | Kebutuhan & Ekspektasi Utama |
|---|---|---|
| **The Urban Mover (Penjual)** | Pekerja kantoran / ekspatriat / mahasiswa tingkat akhir yang pindah sewa apartemen dan ingin *decluttering* furnitur berkualitas cepat tanpa ribet. | Listing cepat, estimasi harga jual wajar, penjadwalan *pickup* tanpa pusing sewa pikap, dan kepastian dana cair. |
| **The Practical Furnisher (Pembeli)** | Penyewa unit baru, mahasiswa, atau pasangan muda yang ingin mengisi hunian dengan perabot fungsional, estetik, dan ramah anggaran. | Dimensi barang akurat, kondisi cacat diungkap jujur, kalkulasi ongkir kargo pasti di muka, proteksi dana aman. |
| **Curated Vintage / Thrift Hunter** | Kolektor perabot retro, mid-century modern, atau kayu solid antik. | Verifikasi keaslian material, foto detail serat/patina, riwayat perawatan barang. |
| **Vendor Logistik Kargo & Helper** | Mitra penyedia armada mobil van, pikap bak/box, serta tenaga bongkar muat terlatih. | Rute penjemputan jelas, detail akses gedung (lift barang/lantai tangga), instruksi dimensi & beban yang akurat. |
| **Spesialis Sanitasi (Cleaning Partner)** | Mitra jasa cuci basah (*wet vacuum* & *steam sanitizing*) profesional. | Alur pesanan terintegrasi, kepastian jadwal kerja sebelum atau sesudah penyerahan barang. |
| **Tim Operasional & CS Attic** | Tim internal yang memonitor transaksi, memoderasi listing, menengahi sengketa, dan koordinasi logistik. | Dashboard admin yang menyajikan status transaksi *real-time*, rekonsiliasi pembayaran *escrow*, dan alat mediasi tiket keluhan. |

---

## 5. Ruang Lingkup Kategori Produk & Standardisasi

| Kategori Utama | Sub-Kategori Populer | Atribut Spesifik Wajib Diisi Penjual |
|---|---|---|
| **Seating** | Sofa (1/2/3 Seater, L-Shape), Kursi Kerja Ergonomis, Armchair, Bangku Makan | Tipe material cover (fabric/kulit sintetis/kulit asli), kekenyalan busa, fungsi mekanis hidrolik/reclining. |
| **Tables & Desks** | Meja Kerja/Belajar, Meja Makan, Coffee Table, Console Table | Material permukaan (solid wood, MDF, tempered glass), status kaki meja (bisa dibongkar-pasang/knock-down). |
| **Storage & Shelves** | Lemari Pakaian, Rak Buku, Credenza, Rak Sepatu, Nakas | Dimensi saat dirakit, jumlah laci/pintu, bobot estimasi, kebutuhan perakitan ulang (*knock-down assembly*). |
| **Bed & Sleep** | Rangka Tempat Tidur, Kasur Busa/Latex/Springbed, Headboard | Ukuran standar (Single, Queen, King), kebersihan busa/per, riwayat penggunaan cover pelindung. |
| **Lighting & Decor** | Floor Lamp, Cermin Dinding Besar, Karpet, Room Divider | Kerapuhan (*fragile check*), voltase lampu, instruksi packing khusus (bubble wrap kayu). |

---

## 6. Alur Pengguna Utama (User Flow)

### 6.1 Alur Penjual: Pembuatan Listing Terstruktur (Seller Listing Flow)
1. Penjual masuk ke akun Attic dan menekan tombol **"Jual Furnitur"**.
2. Memilih kategori & sub-kategori barang.
3. Memasukkan atribut dasar: Judul listing, merek/pembuat, tahun pembelian, warna, dan material utama.
4. Memasukkan atribut fisik presisi:
   - Dimensi fisik: Panjang (cm) × Lebar (cm) × Tinggi (cm).
   - Perkiraan bobot (kg) atau kelas muatan (Ringan, Sedang, Sangat Berat).
   - Opsi *knock-down* (sudah dibongkar / harus dirakit / utuh tidak bisa dibongkar).
5. Memilih **Tier Kondisi Standar** (*Like New*, *Gently Loved*, *Vintage Character*, atau *Needs DIY Love*).
6. Mengunggah media dokumentasi:
   - Minimal 3 foto sudut penuh (depan, samping, belakang).
   - **Wajib:** Minimal 1 foto jarak dekat (*macro close-up*) yang menunjukkan area cacat/lecet/noda (bila memilih kondisi selain *Like New*).
7. Memasukkan data titik penjemputan (*pickup address*):
   - Alamat lengkap + pin lokasi GPS peta.
   - Detail akses bangunan (Rumah tapak / Apartemen; ketersediaan lift barang; lantai unit; jarak jalan masuk truk kargo).
8. Menetapkan harga jual (*listing price*). Sistem menampilkan kalkulator estimasi potongan komisi dan estimasi dana bersih yang diterima penjual.
9. Listing diverifikasi otomatis atau masuk antrean tim moderasi Attic sebelum tayang publik.

### 6.2 Alur Pembeli: Pencarian, Checkout, & Pembayaran Escrow
1. Pembeli mencari furnitur melalui filter terperinci (kategori, dimensi maksimum, lokasi penjual, harga, tier kondisi).
2. Membuka halaman detail produk: mengecek ukuran, deskripsi cacat jujur, lokasi barang, dan melihat simulasi ongkos kirim ke alamatnya.
3. Menekan tombol **"Beli Sekarang"**.
4. Di halaman *Checkout*:
   - Mengonfirmasi alamat pengantaran dan detail akses gedung penerima (lantai, ketersediaan lift barang).
   - Sistem secara otomatis menghitung ongkos kargo kargo berdasarkan volume barang, jarak tempuh, dan jenis armada yang dibutuhkan.
   - Pembeli dapat memilih layanan tambahan (*Add-ons*): Layanan Angkut Ekstra (*Helper*) dan Jasa *Deep Cleaning* sanitasi sofa/kasur.
5. Memilih metode pembayaran via Payment Gateway (Virtual Account, QRIS, Transfer Bank, atau Kartu Kredit/Debit).
6. Pembayaran berhasil terverifikasi. Dana ditampung secara aman di rekening penampung bersama (*Attic Escrow Account*).

### 6.3 Alur Pemenuhan Logistik & Penyerahan Barang
1. Penjual menerima notifikasi pesanan dan memilih slot waktu penjemputan (*pickup window*) dalam kurun waktu 1×24 jam.
2. Attic mengalokasikan armada kargo rekanan (van / blind van / pikap / truk boks kecil) sesuai dimensi dan berat barang.
3. Kurir kargo tiba di lokasi penjual:
   - Kurir/Helper melakukan inspeksi visual kilat bersama penjual.
   - Penjual dan kurir menandatangani berita acara digital penjemputan pada aplikasi kurir.
4. (Opsional) Jika pembeli memesan add-on *Deep Cleaning*, kurir membawa barang ke sentra mitra cuci sebelum diantar, atau tim sanitasi dijadwalkan datang ke lokasi tujuan.
5. Kurir mengantarkan furnitur ke alamat pembeli:
   - Helper membantu mengangkut furnitur hingga ke dalam unit hunian pembeli.
   - Pembeli menandatangani bukti serah terima barang (*Proof of Delivery / POD*) via foto kurir.

### 6.4 Alur Penyelesaian Transaksi & Proteksi Sengketa (Dispute Window)
1. Status pesanan diperbarui menjadi **"Tiba di Tujuan"**.
2. **Jendela Proteksi 24 Jam Aktif:** Pembeli memiliki waktu 1×24 jam untuk memeriksa apakah kondisi barang sesuai dengan foto dan deklarasi cacat pada listing.
   - **Skenario A (Barang Sesuai):** Pembeli menekan tombol **"Pesanan Selesai"** (atau sistem otomatis mengonfirmasi selesai setelah 24 jam lewat). Dana di rekening *escrow* langsung dilepaskan ke saldo dompet penjual (*Seller Wallet*) dan dapat ditarik (*payout/disbursement*).
   - **Skenario B (Terdapat Ketidaksesuaian/Cacat Tak Tertera):** Pembeli menekan **"Ajukan Sengketa"** sebelum 24 jam berakhir dengan menyertakan bukti foto/video unboxing. Dana *escrow* dibekukan sementara. Tim penengah Attic melakukan mediasi (pilihan: pengembalian dana parsial untuk biaya servis, atau retur barang penuh ke penjual dan pengembalian dana 100% ke pembeli).

---

## 7. Kebutuhan Fungsional (Functional Requirements)

Prioritas fitur ditentukan menggunakan metodologi **MoSCoW**:
- **Must Have (M):** Wajib ada untuk peluncuran MVP; tanpanya produk tidak dapat beroperasi.
- **Should Have (S):** Sangat penting dan krusial untuk pengalaman pengguna; diupayakan masuk MVP.
- **Could Have (C):** Fitur bernilai tambah yang dapat dikerjakan jika kapasitas pengembang memadai.
- **Won't Have (W):** Ditunda untuk fase pengembangan selanjutnya.

### 7.1 Modul Autentikasi, Akun, & Profil Pengguna
| ID | Kebutuhan Fungsional | Prioritas |
|---|---|---|
| 7.1.1 | Pendaftaran akun via Email/Password dan Single Sign-On (Google OAuth 2.0). | Must |
| 7.1.2 | Verifikasi nomor ponsel aktif menggunakan OTP (SMS / WhatsApp API) sebagai syarat wajib memasang listing dan transaksi anti-penipuan. | Must |
| 7.1.3 | Manajemen profil pengguna: foto profil, nama lengkap, kontak, daftar buku alamat (mendukung multiple address untuk penjemputan dan pengantaran). | Must |
| 7.1.4 | Pencatatan detail akses hunian pada buku alamat (tipe hunian: rumah tapak / apartemen, nomor lantai, ketersediaan lift barang, catatan parkir kargo). | Must |
| 7.1.5 | Dompet Saldo Penjual (*Seller Payout Balance*) dan integrasi rekening bank untuk penarikan dana penjualan. | Must |
| 7.1.6 | Manajemen preferensi notifikasi (Email, WhatsApp, Push Notification browser). | Should |

### 7.2 Modul Penjual & Manajemen Listing (Seller Engine)
| ID | Kebutuhan Fungsional | Prioritas |
|---|---|---|
| 7.2.1 | Form listing bertahap (*multi-step form*) yang intuitif untuk mengunggah furnitur dengan kompresi gambar otomatis di sisi klien sebelum unggah. | Must |
| 7.2.2 | Kolom wajib metadata dimensi (Panjang, Lebar, Tinggi dalam satuan sentimeter) dan rentang estimasi berat total. | Must |
| 7.2.3 | Pemilihan wajib tingkatan kondisi standar (*Like New*, *Gently Loved*, *Vintage Character*, *Needs DIY Love*) dilengkapi penjelasan kriteria panduan. | Must |
| 7.2.4 | Mekanisme validasi unggahan foto cacat wajib (*mandatory flaw disclosure*): sistem memblokir submit jika penjual memilih kondisi selain *Like New* namun tidak menandai foto bagian lecet/noda. | Must |
| 7.2.5 | Indikator kesehatan kelengkapan listing (*Listing Quality Score*): progress bar yang mendorong penjual melengkapi data dimensi, foto multi-sudut, dan rincian merek. | Should |
| 7.2.6 | Kalkulator taksiran penerimaan bersih penjual yang memotong otomatis estimasi komisi platform saat memasukkan nominal harga jual. | Must |
| 7.2.7 | Dashboard pengelolaan listing penjual: status tayang (*Draft*, *Pending Review*, *Active*, *Reserved/In-Escrow*, *Sold*, *Archived*). | Must |
| 7.2.8 | Fitur penerimaan penawaran harga (*Make an Offer*) dengan batasan toleransi maksimal tawar (misal maksimal diskon 20% dari harga buka). | Could |

### 7.3 Modul Pembeli, Pencarian, & Katalog (Catalog & Discovery)
| ID | Kebutuhan Fungsional | Prioritas |
|---|---|---|
| 7.3.1 | Navigasi katalog kategori hierarkis (Seating, Tables, Storage, Beds, Decor). | Must |
| 7.3.2 | Mesin pencarian berbasis teks (*full-text search*) untuk judul, merek, gaya furnitur (misal: "IKEA", "Japandi", "Kayu Jati", "Minimalis"). | Must |
| 7.3.3 | Filter faset komprehensif: rentang harga, tier kondisi barang, material utama, jarak radius lokasi penjual, serta filter batasan dimensi (maksimal panjang/lebar). | Must |
| 7.3.4 | Halaman detail produk (PDP) komprehensif: galeri foto resolusi tinggi dengan kemampuan *zoom inspection*, lencana status dimensi, daftar deklarasi minus fisik, dan informasi penjual. | Must |
| 7.3.5 | Fitur simulasi ongkos kirim instan di halaman produk cukup dengan memasukkan kelurahan/kecamatan alamat pembeli. | Must |
| 7.3.6 | Fitur Daftar Keinginan (*Wishlist / Save to Favorites*) dengan notifikasi penurunan harga barang. | Should |
| 7.3.7 | Chat termoderasi dalam platform antara calon pembeli dan penjual untuk konsultasi detail barang (dilengkapi sistem otomatis blokir nomor kontak luar/filter anti-transaksi luar platform). | Should |

### 7.4 Modul Logistik Muatan Besar & Layanan Tambahan (Bulky Cargo & Add-ons)
| ID | Kebutuhan Fungsional | Prioritas |
|---|---|---|
| 7.4.1 | Mesin kalkulasi rekomendasi armada otomatis: sistem menentukan jenis armada kargo terendah yang mampu memuat barang (Van, Pikap Bak, Pikap Boks, Engkel Boks) berdasarkan algoritma volume kubikasi (*CBM calculation*). | Must |
| 7.4.2 | Integrasi API logistik pihak ketiga / logistik mitra (Lalamove, Deliveree, atau armada kurir mandiri) untuk penentuan tarif instan transparan saat checkout. | Must |
| 7.4.3 | Pemilihan jadwal slot waktu penjemputan dan pengiriman yang disinkronisasi antara penjual dan pembeli. | Must |
| 7.4.4 | Opsi add-on: Layanan Tenaga Angkut (*Helper Service* 1 atau 2 orang) untuk membawa furnitur dari/ke dalam unit hunian bertingkat. | Must |
| 7.4.5 | Opsi add-on: Layanan Sanitasi Profesional (*Deep Clean & Sanitization*) khusus kategori sofa, kasur, dan kursi kain dengan mitra cuci profesional. | Should |
| 7.4.6 | Fitur pelacakan status kurir kargo *live* atau pembaruan status berbasis *milestone* (*Driver Assigned*, *En Route to Pickup*, *Item Loaded*, *En Route to Delivery*, *Delivered*). | Must |

### 7.5 Modul Pembayaran Escrow & Penyelesaian Pesanan
| ID | Kebutuhan Fungsional | Prioritas |
|---|---|---|
| 7.5.1 | Integrasi Payment Gateway resmi (mendukung BCA/Mandiri/BNI/BRI Virtual Account, QRIS, GoPay, OVO, ShopeePay, Kartu Kredit 3DS). | Must |
| 7.5.2 | Sistem penahanan dana (*Escrow Vault Logic*): status dana aman tersimpan di platform dan tidak langsung diteruskan ke rekening penjual. | Must |
| 7.5.3 | Mekanisme batas waktu bayar (*Payment Timeout*): reservasi barang selama 60 menit saat checkout; jika lewat, stok otomatis dilepas kembali ke status *Active*. | Must |
| 7.5.4 | Jendela evaluasi 24 jam (*24-Hour Buyer Inspection Window*) pasca status pengiriman tercatat sukses diserahkan. | Must |
| 7.5.5 | Pelepasan dana otomatis (*Auto-release*) ke saldo dompet penjual setelah 24 jam apabila pembeli tidak mengajukan klaim/sengketa. | Must |
| 7.5.6 | Fitur pengajuan sengketa komprehensif (*Dispute Center*): pembeli wajib mengunggah deskripsi masalah, foto perbandingan cacat fisik vs listing, dan bukti unboxing. | Must |
| 7.5.7 | Pengembalian dana (*Refund System*): mekanisme pengembalian dana ke pembeli bila pesanan dibatalkan penjual atau jika hasil putusan sengketa memenangkan pembeli. | Must |

### 7.6 Modul Dashboard Admin & Operasional Platform
| ID | Kebutuhan Fungsional | Prioritas |
|---|---|---|
| 7.6.1 | Manajemen akses berbasis peran (*Role-Based Access Control*) untuk superadmin, tim kurasi konten, tim operasional logistik, dan layanan pelanggan (CS). | Must |
| 7.6.2 | Antrean moderasi listing (*Listing Moderation Queue*): menyetujui, meminta revisi deskripsi/foto, atau menolak barang yang dilarang. | Must |
| 7.6.3 | Dasbor pemantauan transaksi *real-time*: memantau pesanan aktif, keterlambatan armada kurir, serta perputaran saldo *escrow*. | Must |
| 7.6.4 | Pusat mediasi sengketa (*Dispute Management Desk*): CS dapat memeriksa histori percakapan, foto klaim barang, serta menetapkan keputusan arbitrase (retur barang, kompensasi potongan, atau tolak klaim). | Must |
| 7.6.5 | Manajemen tarif komisi platform, voucher promosi diskon ongkir, dan penyesuaian tarif add-on pembersihan/helper. | Should |
| 7.6.6 | Ekspor data laporan operasional dan finansial (format CSV / Excel) untuk rekonsiliasi pembukuan dan audit. | Must |

---

## 8. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Kategori | Spesifikasi Kebutuhan |
|---|---|
| **Performa & Kecepatan** | - Waktu muat awal (*First Contentful Paint* / FCP) < 1.5 detik pada jaringan seluler 4G.<br>- *Largest Contentful Paint* (LCP) < 2.5 detik.<br>- Optimalisasi gambar otomatis: konversi ke format WebP/AVIF dengan *lazy loading* dan *responsive srcset*. |
| **Ketersediaan (Availability)** | Target ketersediaan sistem (*uptime*) mencapai 99.8% setiap bulan di luar periode pemeliharaan terjadwal (*scheduled maintenance*). |
| **Keamanan Data & Transaksi** | - Seluruh komunikasi data dilindungi protokol enkripsi TLS 1.3 (HTTPS).<br>- Kata sandi di-hash menggunakan algoritma Bcrypt/Argon2.<br>- Penerapan proteksi serangan web standar (CORS ketat, CSRF tokens, sanitasi XSS, proteksi SQL Injection via ORM/Prepared Statements).<br>- Pembayaran didelegasikan penuh ke penyedia gateway tersertifikasi standar keamanan PCI-DSS Level 1. |
| **Privasi Pengguna** | - Kepatuhan penuh terhadap regulasi perlindungan data (UU Perlindungan Data Pribadi / UU PDP).<br>- Masking data sensitif: alamat penjemputan penjual dan alamat pembeli tidak ditampilkan secara lengkap di katalog publik; hanya dibuka kepada kurir dan pihak pembeli setelah transaksi pembayaran valid. |
| **Aksesibilitas & Perangkat** | - Desain *Mobile-First Responsive Web*, optimal pada resolusi layar ponsel pintar (360px ke atas), tablet, hingga layar desktop.<br>- Mengikuti standar aksesibilitas WCAG 2.1 Level AA untuk kontras warna teks dan navigasi form yang mudah dibaca. |
| **Skalabilitas** | Arsitektur *stateless API backend* yang memungkinkan penambahan kapasitas komputasi (*horizontal auto-scaling*) saat terjadi lonjakan kunjungan transaksi. |

---

## 9. Peran & Hak Akses Pengguna (Role-Based Access Control)

| Peran (Role) | Hak Akses & Cakupan Wewenang |
|---|---|
| **Pengguna Umum (Buyer)** | Menjelajahi katalog, mencari barang, menambahkan ke wishlist, melakukan checkout, membayar via escrow, konfirmasi penerimaan barang, mengajukan sengketa barang, memberikan ulasan penjual. |
| **Pengguna Terverifikasi (Seller)** | Seluruh hak akses buyer, ditambah: membuat dan mengelola listing perabot, menentukan slot waktu penjemputan barang, menerima penawaran harga, mencairkan saldo dompet (*payout*), merespons tiket keluhan sengketa. |
| **Mitra Logistik & Helper** | Mengakses antarmuka kurir web: melihat rute titik penjemputan dan pengantaran, catatan akses gedung, mengisi bukti foto serah terima barang (*Proof of Delivery*). |
| **Mitra Sanitasi (Cleaning Partner)** | Melihat antrean jadwal permintaan layanan *deep cleaning*, memperbarui status pelaksanaan sanitasi, mengunggah bukti pengerjaan cuci. |
| **Admin Kurasi & Konten** | Memeriksa antrean listing baru, menyetujui/menolak kelayakan foto dan standar kondisi barang, mengelola banner promosi dan artikel edukasi dekorasi rumah. |
| **Admin CS & Mediasi Sengketa** | Membaca riwayat transaksi dan log chat pembeli-penjual, meninjau bukti sengketa kerusakan, memutuskan status pencairan dana *escrow* (refund atau teruskan ke penjual). |
| **Admin Keuangan (Finance Admin)** | Memantau mutasi penarikan dana dompet penjual, rekonsiliasi pembayaran gateway vs bank penampung, melihat laporan laba komisi platform. |
| **Superadmin (Founder / Tech Lead)** | Akses menyeluruh (*full root access*) ke seluruh modul sistem, pengaturan konfigurasi database, manajemen hak akses staf admin, audit sistem, dan penyesuaian parameter komisi bisnis. |

---

## 10. Arsitektur & Integrasi Pihak Ketiga

- **Payment Gateway:** Midtrans / Xendit / Doku — memfasilitasi rekonsiliasi otomatis pembayaran VA, e-Wallet, QRIS, dan kartu kredit berstandar 3D Secure.
- **On-Demand Cargo Logistics:** Integrasi API Lalamove for Business / Deliveree / GoSend Cargo — untuk penentuan tarif kargo instan berbasis jarak dan tipe armada, pemesanan armada otomatis (*auto-dispatch*), serta *tracking webhook*.
- **Peta & Geocoding:** Google Maps Platform (Places API, Geocoding API, Distance Matrix API) atau Mapbox — untuk akurasi titik pin koordinat penjemputan dan kalkulasi jarak rute sebenarnya.
- **Media Object Storage:** Cloudflare R2 / AWS S3 terhubung dengan Global CDN — penyimpanan gambar produk berskala besar dengan biaya *egress* efisien.
- **Layanan Notifikasi:**
  - *Transactional Email:* Resend / Postmark / SendGrid untuk email verifikasi akun, kuitansi pembayaran, dan ringkasan status pesanan.
  - *WhatsApp Business API:* Fonnte / WATI / Gupshup untuk notifikasi cepat konfirmasi jadwal penjemputan kurir dan verifikasi OTP pendaftaran.
- **Analitik & Metrik:** PostHog / Google Analytics 4 untuk pemantauan alur konversi belanja (*funnel drop-off*), pencarian barang, dan efektivitas listing.

---

## 11. Model Data Utama (Garis Besar Entitas Basis Data)

Daftar entitas inti yang dirancang pada relasi basis data (PostgreSQL):

```
+-----------------------------------------------------------------------------------+
|                                  DATABASE ENTITIES                                |
+-----------------------------------------------------------------------------------+

 [User] 1 ------- * [Address] (Tipe hunian, lantai, ketersediaan lift)
   |
   +--------- 1 ------- * [Listing] (Judul, dimensi, berat, kondisi tier, harga)
   |                        |
   |                        +-- 1 --- * [ListingMedia] (Foto penuh, foto macro cacat)
   |                        |
   |                        +-- 1 --- 1 [ListingAuditLog] (Riwayat status moderasi)
   |
   +--------- 1 ------- * [Order] (Nomor transaksi, total nilai, status pesanan)
                            |
                            +-- 1 --- 1 [PaymentTransaction] (Status gateway, escrow)
                            |
                            +-- 1 --- 1 [LogisticsShipment] (Jenis armada, rute, helper)
                            |             |
                            |             +-- 1 --- * [ShipmentEvent] (Tracking status)
                            |
                            +-- 1 --- 1 [EscrowHold] (Jendela proteksi 24 jam, dana)
                            |
                            +-- 0..1 - 1 [DisputeClaim] (Alasan sengketa, bukti foto)
                            |
                            +-- 0..1 - 1 [CleaningTask] (Jadwal deep cleaning, bukti)
                            |
                            +-- 1 --- 1 [ReviewRating] (Ulasan kondisi & akurasi penjual)
```

### Penjelasan Rinci Entitas Utama:
- **User:** Menyimpan kredensial autentikasi, nama, nomor telepon terverifikasi, role akses, dan saldo dompet penjual.
- **Address:** Menyimpan titik koordinat GPS lat/long, alamat tekstual, patokan lokasi, serta parameter krusial akses gedung: `is_apartment` (boolean), `floor_level` (integer), `has_service_elevator` (boolean), dan `staircase_width_ok` (boolean).
- **Listing:** Menyimpan informasi produk, panjang/lebar/tinggi (cm), kelas berat kubikasi, tier kondisi (`LIKE_NEW`, `GENTLY_LOVED`, `VINTAGE_CHARACTER`, `NEEDS_DIY`), harga, dan status publikasi.
- **Order & EscrowHold:** Menyimpan rincian finansial pesanan, nominal barang, ongkos kirim, biaya proteksi platform, batas waktu transfer, serta status dana tertahan di rekening bersama hingga 24 jam pasca status terkirim.
- **LogisticsShipment:** Menyimpan penugasan armada kargo (`VAN`, `PICKUP_BAK`, `PICKUP_BOX`, `ENGKEL`), jumlah tenaga angkut tambahan (`helper_count`), jadwal *pickup*, dan URL bukti serah terima digital (*digital signature / photo POD*).
- **DisputeClaim:** Menampung pengajuan komplain pembeli sebelum dana *escrow* cair, mencakup tipe keluhan (`DEFECT_NOT_DISCLOSED`, `DAMAGE_IN_TRANSIT`, `WRONG_DIMENSIONS`), bukti foto/video, serta status resolusi mediasi tim penengah.

---

## 12. Metrik Keberhasilan Produk (Key Performance Indicators)

| Aspek | Indikator Kinerja Utama (KPI) | Target Kinerja (Fase Pilot 3 Bulan Pertama) |
|---|---|---|
| **Likuiditas Pasar** | Durasi rata-rata listing aktif hingga terjual (*Listing Liquidity Speed*). | < 21 hari kalender untuk 50% listing terverifikasi. |
| **Akurasi & Kualitas** | Rasio sengketa ketidaksesuaian kondisi barang (*Condition Dispute Rate*). | < 3% dari total volume pesanan selesai. |
| **Keberhasilan Pengiriman** | Tingkat ketepatan waktu dan keberhasilan pengantaran kargo (*Logistics Fulfillment Rate*). | > 96% pengiriman sukses tanpa kegagalan muat. |
| **Adopsi Layanan Tambahan** | Tingkat pembelian layanan tambahan (*Add-on Attachment Rate*). | > 25% pesanan memilih layanan Helper; > 15% pesanan kategori sofa/kasur memilih Deep Clean. |
| **Keterlibatan Pengguna** | Persentase penjual yang melengkapi seluruh data dimensi dan foto cacat (*Complete Listing Compliance*). | > 85% dari total listing yang diajukan. |
| **Stabilitas Sistem** | Angka *uptime* platform web dan latensi API saat checkout. | Uptime > 99.8%; rata-rata respon kalkulasi ongkir < 1 detik. |

---

## 13. Pedoman Desain, UI/UX, & Branding

- **Konsep Identitas Visual "Attic":**
  - Mengangkat estetika hangat, terpercaya, dan modern terkurasi (perpaduan warna alami kayu/terracotta lembut, krem netral, dan aksen charcoal elegan). Menghindari kesan visual pasar loak yang kumuh ataupun marketplace umum yang terlalu bising/ramai iklan.
- **Prinsip Kejujuran Informasi (Radical Transparency):**
  - Lencana kondisi barang (*Condition Badges*) harus kontras dan langsung terbaca pada kartu produk tanpa perlu membuka halaman baru.
  - Bagian foto cacat produk wajib memiliki bingkai penanda khusus (*warning badge*) agar pembeli menyadari lecet fisik sejak awal.
- **Visualisasi Dimensi yang Membumi:**
  - Menghindari sekadar angka centimeter kering; menyertakan diagram siluet perbandingan ukuran manusia atau objek umum di samping gambar furnitur agar pembeli mudah membayangkan skala perabot di ruangannya.
- **Pengalaman Checkout Bebas Cemas:**
  - Alur checkout memecah biaya secara gamblang: Harga Furnitur + Ongkos Kargo Terhitung + Biaya Helper (jika dipilih) + Biaya Proteksi Escrow Platform. Tidak ada biaya siluman (*no hidden fees*).

---

## 14. Rencana Tahapan Rilis & Pengembangan (Roadmap)

| Tahapan | Durasi | Fokus Pengembangan & Target Deliverables |
|---|---|---|
| **Fase 1 — Desain UI/UX & Fondasi Sistem** | Minggu 1 – 3 | - Wireframing alur lengkap dan Final High-Fidelity UI Design (Figma).<br>- Setup repositori, CI/CD pipeline, konfigurasi basis data PostgreSQL, dan autentikasi dasar.<br>- Implementasi sistem buku alamat dengan pendataan kriteria hunian bertingkat. |
| **Fase 2 — Mesin Listing Terstruktur & Kurasi** | Minggu 4 – 6 | - Pembangunan formulir multi-langkah listing penjual dengan kompresi gambar otomatis.<br>- Validasi unggahan foto cacat wajib dan logika kalkulasi biaya komisi platform.<br>- Halaman katalog faset pencarian, filter dimensi, dan halaman detail produk (PDP). |
| **Fase 3 — Mesin Logistik Kargo & Checkout Escrow** | Minggu 7 – 9 | - Algoritma kalkulasi volume kubikasi furnitur untuk pemilihan jenis armada kargo.<br>- Integrasi Payment Gateway dengan penahanan dana (*Escrow Vault Logic*).<br>- Integrasi API kurir pihak ketiga untuk estimasi tarif kargo otomatis dan opsi tenaga helper. |
| **Fase 4 — Dashboard Admin & Pusat Mediasi Sengketa** | Minggu 10 – 11 | - Dashboard internal untuk tim kurasi konten dan CS mediasi sengketa.<br>- Jendela proteksi 24 jam dan mekanisme pelepasan dana otomatis (*auto-release payout*).<br>- Integrasi notifikasi transaksional WhatsApp dan Email. |
| **Fase 5 — Pengujian Menyeluruh & Pilot Launch** | Minggu 12 – 14 | - Pengujian menyeluruh (*End-to-End Testing*, Security Penetration Test, Load Test).<br>- Rekrutmen batch penjual pilot (50–100 unit furnitur terkurasi di wilayah Jabodetabek).<br>- Peluncuran publik versi MVP Pilot dan pemantauan metrik likuiditas transaksi. |

---

## 15. Manajemen Risiko & Strategi Mitigasi

| Skenario Risiko | Potensi Dampak | Rencana Tindakan & Mitigasi |
|---|---|---|
| **Furnitur Tidak Muat di Pintu/Lift Gedung** | Barang tertahan di lobi/tangga, pengiriman tertunda, pembeli menolak menerima barang. | - Wajib mencantumkan input dimensi barang pada saat listing.<br>- Sistem checkout menampilkan formulir cek akses gedung penerima dan konfirmasi dimensi lorong/pintu sebelum bayar disetujui.<br>- Helper terlatih mengecek opsi pembongkaran kaki meja/engsel di tempat bila darurat. |
| **Kerusakan Barang Selama Perjalanan Kargo** | Sengketa antara pembeli, penjual, dan pihak penyedia kargo mengenai pihak yang bertanggung jawab. | - Standar Prosedur Operasional (SOP) kurir: kurir wajib mengambil foto barang sebelum dinaikkan ke armada dan saat tiba di tujuan (*Proof of Condition*).<br>- Penyertaan polis asuransi pengangkutan mikro terintegrasi pada biaya logistik kargo untuk meng-cover risiko benturan/lecet jalanan. |
| **Penjual Berbuat Curang (Menyembunyikan Kerusakan Parah)** | Kekecewaan pembeli, rusaknya reputasi kepercayaan platform. | - Dana pembeli ditahan 100% di *Escrow* selama 1×24 jam pasca barang tiba.<br>- Bila cacat terbukti disembunyikan dan tidak tercantum pada listing awal, pembeli berhak memperoleh opsi retur dana penuh dan ongkos kirim retur dibebankan sebagai penalti saldo penjual. |
| **Transaksi Gelap di Luar Platform (*Disintermediasi*)** | Pembeli dan penjual bertransaksi mandiri via WA demi menghindari komisi platform; platform kehilangan pendapatan. | - Perlindungan asuransi pengiriman dan jaminan *escrow* hanya berlaku untuk transaksi resmi di dalam Attic.<br>- Fitur pesan obrolan dalam web dilengkapi filter deteksi nomor telepon, link luar, dan kata kunci nomor rekening bank. |
| **Barang Berbau Tidak Sedap atau Berhigiene Buruk** | Pembeli komplain terhadap kebersihan kasur/sofa kain. | - Standarisasi visual kondisi: furnitur yang kotor parah/bernoda permanen ditolak saat antrean moderasi listing.<br>- Mendorong konversi add-on *Deep Cleaning Sanitization* pada saat checkout barang berbusa/kain dengan harga paket promo bersubsidi. |

---

## 16. Asumsi & Dependensi Ketergantungan

- **Kemitraan Logistik:** Tersedianya akses integrasi API atau kerja sama operasional dengan penyedia armada kargo muatan besar (van/pikap) yang mencakup wilayah metropolitan Jabodetabek pada saat Fase 3 dimulai.
- **Legalitas & Lisensi Pembayaran:** Kemitraan dengan agregator payment gateway berlisensi Bank Indonesia untuk mengoperasikan alur penampungan dana bersama (*escrow fund flow*) secara patuh hukum.
- **Jaringan Tenaga Sanitasi:** Tersedianya mitra penyedia jasa cuci perabot rumah tangga di kota operasional utama yang bersedia mengikuti standar SLA pengerjaan Attic.
- **Pasokan Awal Listing:** Kemitraan dengan toko furnitur *vintage*, penjual perabot display lelang, serta komunitas mahasiswa/ekspatriat untuk menjamin ketersediaan minimal 100 inventaris furnitur berkualitas saat hari peluncuran pertama.

---

## 17. Dokumen Terkait & Lampiran

- **PRD_UIGTR_2026.md:** Dokumen standar acuan struktur penulisan PRD teknis.
- **Dokumen Desain UI/UX (Figma):** *(Tautan rancangan sistem desain dan mockup antarmuka pengguna).*
- **Spesifikasi Teknis & Schema API (Swagger/Postman):** *(Dokumen terpisah yang disusun tim Engineering pasca pengesahan PRD ini).*
- **SOP Penanganan Logistik & Helper:** *(Panduan operasional lapangan untuk mitra pengemudi dan tenaga angkut).*
