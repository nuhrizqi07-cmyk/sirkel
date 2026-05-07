# 📦 SIRKEL — Platform Aggregator UMKM Indonesia

## Tagline
**"Jual gak bingung, cari gak pusing."**

---

## 1. Latar Belakang

Setiap hari, ribuan UMKM di Indonesia memproduksi barang berkualitas — susu kambing segar, madu hutan, keripik singkong, kopi specialty — tapi banyak yang **gak tau mau jual kemana**. Di sisi lain, distributor, reseller, dan toko kelontong **susah cari supplier** yang terpercaya.

Tidak ada platform yang secara spesifik menjembatani **produsen UMKM** dengan **pencari/distributor** secara simpel dan langsung.

---

## 2. Solusi: SIRKEL

SIRKEL adalah **direktori pencarian UMKM** yang menghubungkan:

```
👨‍🌾 PRODUSEN  ──►  SIRKEL  ──►  🏪 DISTRIBUTOR / RESELLER
(Punya barang)     (cari & temukan)      (Cari barang)
```

Bukan marketplace — SIRKEL gak jualan barang, tapi **nyediain data kontak** produsen & distributor UMKM dalam satu tempat. Cari, dapet nomor, langsung chat. **Gak pake ribet.**

---

## 3. Target User

| User | Masalah | Solusi SIRKEL |
|------|---------|---------------|
| **Produsen UMKM** (peternak, petani, pengrajin) | "Susu kambingku 50L/hari, dijual kemana?" | Cari distributor/reseller potensial di direktori |
| **Distributor / Reseller** | "Cari supplier susu kambing daerah Jatim" | Temukan produsen terdekat lengkap dengan kontak |
| **Toko / Pedagang** | "Butuh stok madu hutan rutin" | Cari & hubungi produsen langsung lewat telepon/WA |
| **Siapa aja** | "Pengen jualan susu kambing tapi gak tau supplier" | Lihat daftar produsen, tinggal kontak |

---

## 4. Fitur Utama

### 🔍 Pencarian Multi-Filter (Jantung Aplikasi!)
Cari UMKM berdasarkan:

```
Kategori: [Susu & Olahan ▼]     Provinsi: [Jawa Timur ▼]
Kota: [Surabaya ▼]              Cari: [🔍 "susu kambing"]
```

Hasil langsung muncul — **nama, alamat, telepon** — tanpa login, tanpa isi form aneh-aneh.

### 📋 Detail Profil Produsen
Pas diklik, muncul halaman detail:

```
┌─ Pabrik Susu Kambing SANIGUNA ──────────────┐
│ 📞 0878-3744-7636    [💬 WA] [📞 Telepon]   │
│ 📍 Jl. Kemirikebo No.1/7, Sleman, DIY       │
│ 🏭 Kategori: Susu & Olahan                   │
│ 🏪 Tipe: Produsen                            │
│ 📝 Deskripsi lengkap                        │
│ 📎 Sumber data                              │
└──────────────────────────────────────────────┘
```

**Tombol WA langsung** — satu klik, langsung chat. Gak perlu copy nomor.

### 🏠 Halaman Utama
```
🔍 [Cari produk, produsen, atau distributor...]

📂 KATEGORI
  🥛 Susu  🍯 Madu  ☕ Kopi  🌶️ Bumbu  🍪 Camilan  🧴 Kosmetik

🔥 TERPOPULER
  • Susu Kambing — 15 produsen ditemukan
  • Madu Asli    — 8 produsen ditemukan
  • Kopi Bubuk   — 12 produsen ditemukan

👥 PRODUSEN TERBARU
  [Card] [Card] [Card] [Card]
```

### 📊 Halaman Statistik
```
Provinsi dengan produsen terbanyak:
  🥇 Jawa Timur — 45 produsen
  🥇 DIY        — 23 produsen
  🥇 Jawa Barat — 20 produsen

Kategori terpopuler:
  🥛 Susu & Olahan — 30
  🍯 Madu & Herbal — 18
```

Berguna buat tau **pasar lagi butuh apa**, cocok buat konten marketing.

### 🔧 Admin Import Data
Upload data baru tanpa coding:
- Upload CSV/JSON
- Mapping otomatis ke database
- Edit, hapus, validasi data

---

## 5. Alur Pengguna

### Skenario: "Si A punya susu kambing"

```
1. Si A buka SIRKEL
2. Ketik "distributor susu kambing" di pencarian
3. Muncul daftar:
   ┌─────────────────────────────────────────┐
   │ Distributor Susu Kambing Supergoat      │
   │ 📍 Sidoarjo, Jatim  📞 0821-xxxx-xxxx   │
   │ 🏪 Distributor susu bubuk              │
   │ 📱 [WA Langsung]                        │
   ├─────────────────────────────────────────┤
   │ AGEN SUSU KAMBING GOMARS                │
   │ 📍 Perum Greenland  📞 0857-xxxx-xxxx   │
   ├─────────────────────────────────────────┤
   │ Pabrik SANIGUNA                          │
   │ 📍 Sleman, DIY  📞 0878-xxxx-xxxx       │
   └─────────────────────────────────────────┘
4. Si A klik WA → langsung chat "Permisi, saya punya susu kambing..."
5. Deal! 🎉
```

### Skenario: "Si B cari supplier madu"

```
1. Si B buka SIRKEL
2. Pilih kategori "Madu & Herbal"
3. Filter provinsi "Jawa Timur"
4. Muncul produsen madu di Jatim:
   ┌─────────────────────────────────────────┐
   │ Madu Hutan Ratu Lebah                   │
   │ 📍 Ponorogo, Jatim  📞 0812-xxxx-xxxx   │
   │ 📱 [WA Langsung]                        │
   └─────────────────────────────────────────┘
5. Si B klik WA → langsung chat
```

---

## 6. Sumber Data

| Sumber | Status | Data Didapat |
|--------|--------|-------------|
| **Indonetwork** | ✅ Terintegrasi | Nama, alamat, deskripsi |
| **Google Maps** | ✅ Terintegrasi (terbatas) | Nama, alamat, **telepon** |
| **Facebook Groups** | 🔜 Rencana | Postingan jual/cari |
| **Telegram Groups** | 🔜 Rencana | Postingan jual/cari |
| **Input Manual** | ✅ | Data dari user langsung |
| **Form Submission** | 🔜 Rencana | UMKM daftar sendiri |

---

## 7. Tech Stack

| Komponen | Teknologi | Alasan |
|----------|-----------|--------|
| **Frontend** | Next.js 16 | Kamu udah familiar |
| **Backend** | Next.js API Routes | Satu project |
| **Database** | Supabase (PostgreSQL) | Udah punya akun |
| **Hosting** | Vercel / Railway | Udah pernah pake |
| **Scraping** | Python + Browser | Udah terbukti |

---

## 8. Nama Aplikasi

| Nama | Alasan |
|------|--------|
| **SIRKEL** | "Sirkulasi Ekonomi Lokal" — gampang diingat |
| **JEMPOL** | "Jaringan Ekonomi Masyarakat Produktif Lokal" |
| **PASARIN** | Bahasa Jawa "pasar" + "-in" = bikin laku |
| **TEMAN** | "Tempat Manfaatin" — simple |
| **SAMBUNG** | Menyambungkan produsen & distributor |

---

## 9. Roadmap MVP

**Fase 1 — Database (Sekarang)**
- [x] Scraping Indonetwork ✅
- [x] Scraping Google Maps ✅
- [ ] Kategorisasi & bersihin data
- [ ] CRUD manual entry

**Fase 2 — Web App**
- [ ] Halaman utama — kategori populer & statistik
- [ ] Pencarian multi-filter (kategori, provinsi, kota)
- [ ] Halaman detail produsen + tombol WA langsung
- [ ] Halaman statistik sederhana

**Fase 3 — Admin & Scale**
- [ ] Panel admin import data CSV/JSON
- [ ] Form pendaftaran UMKM
- [ ] Scraping otomatis berkala
- [ ] Halaman statistik lengkap

---

## 10. Yang GAK Ada (Buat Awal)

| Fitur | Alasan Skip |
|-------|-------------|
| ❌ Login/Register | Orang cuma mau cari kontak, gak perlu daftar |
| ❌ Pasang Permintaan | Fokus ke direktori dulu |
| ❌ Transaksi / Keranjang | Bukan marketplace |
| ❌ Chat internal | WA langsung lebih simpel & real |
| ❌ Matchmaking otomatis | Belum perlu, masih tahap awal |

---

## 11. Mockup Halaman

### Halaman Utama
```
┌─────────────────────────────────────────────────┐
│ 🔍 [Cari produk, produsen, atau distributor...] │
└─────────────────────────────────────────────────┘

📂 KATEGORI POPULER
┌──────┬──────┬──────┬──────┬──────┬──────┐
│ 🥛   │ 🍯   │ ☕   │ 🌶️  │ 🍪   │ 🧴   │
│ Susu  │ Madu  │ Kopi  │ Bumbu │ Camilan│Kosmetik│
└──────┴──────┴──────┴──────┴──────┴──────┘

🔥 TERPOPULER
• Susu Kambing — 15 produsen
• Madu Asli    — 8 produsen
• Kopi Bubuk   — 12 produsen

👥 PRODUSEN TERBARU
[Card] [Card] [Card] [Card]
```

### Halaman Hasil Pencarian
```
🔍 "susu kambing" — 15 hasil

Filter: [Semua Kota ▼] [Semua Provinsi ▼]

┌─────────────────────────────────────────────┐
│ Pabrik Susu Kambing Etawa SANIGUNA           │
│ 📍 Sleman, DIY  |  🏭 Produsen              │
│ 📞 0878-3744-7636  [💬 WA]                  │
├─────────────────────────────────────────────┤
│ Distributor Susu Kambing Supergoat           │
│ 📍 Sidoarjo, Jatim  |  🏪 Distributor       │
│ 📞 0821-3361-6544  [💬 WA]                  │
├─────────────────────────────────────────────┤
│ AGEN SUSU KAMBING GOMARS                    │
│ 📍 Kemantren  |  🏪 Grosir                 │
│ 📞 0857-4811-1247  [💬 WA]                  │
└─────────────────────────────────────────────┘
```

### Halaman Detail Produsen
```
┌────────────────────────────────────────────┐
│ Pabrik Susu Kambing Etawa SANIGUNA         │
│ ⭐ 4.4  |  🏭 Produsen                    │
│ 📍 Jl. Kemirikebo No.1/7, Sleman, DIY     │
│ 📞 0878-3744-7636                          │
│ 💬 [WhatsApp]  📞 [Telepon]               │
├────────────────────────────────────────────┤
│ PROFIL                                     │
│ Produsen susu kambing etawa bubuk & segar  │
│ Sumber: Google Maps                        │
├────────────────────────────────────────────┤
│ PRODUK                                     │
│ • Susu Kambing Etawa Bubuk                │
│ • Susu Kambing Segar                       │
│ • Yoghurt Susu Kambing                     │
└────────────────────────────────────────────┘
```

### Halaman Statistik
```
📊 STATISTIK UMKM

Berdasarkan kategori:
🥛 Susu & Olahan — 30 produsen
🍯 Madu & Herbal — 18 produsen
☕ Kopi & Teh    — 12 produsen
...

Berdasarkan provinsi:
🥇 Jawa Timur  — 45
🥇 DIY         — 23
🥇 Jawa Barat  — 20
...
```

---

*Dokumen ini bisa langsung dipake buat presentasi atau acuan develop.*
