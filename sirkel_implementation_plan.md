# 🚀 SIRKEL — Implementation Plan for AI Coding

## Overview
Next.js 16 + Supabase (PostgreSQL) + Tailwind CSS
No auth. No login. No marketplace. Pure directory.

---

## 1. Project Setup

```bash
npx create-next-app@latest sirkel --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd sirkel
npm install @supabase/supabase-js lucide-react
```

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 2. Database — Supabase

### Tables

**kategori**
```sql
CREATE TABLE kategori (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(10), -- emoji
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**mitra**
```sql
CREATE TYPE tipe_mitra AS ENUM ('produsen', 'distributor', 'keduanya');
CREATE TABLE mitra (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_perusahaan VARCHAR(200) NOT NULL,
    tipe tipe_mitra DEFAULT 'produsen',
    contact_person VARCHAR(100),
    no_telepon VARCHAR(30),
    email VARCHAR(100),
    alamat TEXT,
    kota VARCHAR(100),
    provinsi VARCHAR(100),
    deskripsi TEXT,
    sumber_data VARCHAR(50) DEFAULT 'manual',
    url_sumber TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**produk**
```sql
CREATE TABLE produk (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mitra_id UUID NOT NULL REFERENCES mitra(id) ON DELETE CASCADE,
    kategori_id UUID REFERENCES kategori(id),
    nama VARCHAR(200) NOT NULL,
    deskripsi TEXT,
    satuan VARCHAR(30),
    harga_min NUMERIC(12,0),
    harga_max NUMERIC(12,0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Indexes
```sql
CREATE INDEX idx_mitra_kota ON mitra(kota);
CREATE INDEX idx_mitra_provinsi ON mitra(provinsi);
CREATE INDEX idx_mitra_tipe ON mitra(tipe);
CREATE INDEX idx_produk_kategori ON produk(kategori_id);
```

### Seed Data
Insert 12 categories (susu, madu, kopi, bumbu, camilan, dll) and sample produsen data (from scraping results).

---

## 3. Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Tailwind
│   ├── cari/
│   │   └── page.tsx        # Search results page
│   ├── mitra/
│   │   └── [slug]/
│   │       └── page.tsx    # Detail produsen
│   └── statistik/
│       └── page.tsx        # Statistics page
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── SearchBar.tsx
│   │   ├── CardMitra.tsx
│   │   ├── KategoriIcon.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── ButtonWA.tsx
│   │   └── StatCard.tsx
│   ├── HeroSection.tsx
│   ├── KategoriGrid.tsx
│   ├── MitraList.tsx
│   └── Footer.tsx
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── utils.ts            # Helper functions
│   └── types.ts            # TypeScript types
├── data/
│   └── kategori.ts         # Kategori list constant
```

---

## 4. Core Components

### src/lib/types.ts
```typescript
export interface Mitra {
  id: string;
  nama_perusahaan: string;
  tipe: 'produsen' | 'distributor' | 'keduanya';
  contact_person: string | null;
  no_telepon: string | null;
  email: string | null;
  alamat: string | null;
  kota: string | null;
  provinsi: string | null;
  deskripsi: string | null;
  sumber_data: string;
  verified: boolean;
  created_at: string;
  produk?: Produk[];
}

export interface Produk {
  id: string;
  mitra_id: string;
  kategori_id: string;
  nama: string;
  deskripsi: string | null;
  satuan: string | null;
}

export interface Kategori {
  id: string;
  nama: string;
  slug: string;
  icon: string;
}
```

### src/lib/supabase.ts
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Components to build:

**SearchBar.tsx** — Input + kategori dropdown + provinsi dropdown
- State: query, kategori, provinsi
- On submit: navigate to `/cari?q=...&kategori=...&provinsi=...`

**FilterPanel.tsx** — Sidebar/top filter for search page
- Kategori (checkboxes/dropdown)
- Provinsi (dropdown)
- Tipe (produsen/distributor/semua)
- Tombol reset

**CardMitra.tsx** — Card in search results
```tsx
// Props: mitra: Mitra
// Display: nama, alamat singkat, tipe badge, telepon
// Actions: klik → detail page, tombol WA langsung
```

**ButtonWA.tsx** — WhatsApp quick action button
```tsx
// Props: phone: string
// On click: window.open(`https://wa.me/62${phone.replace(/^0/, '')}`)
```

**KategoriGrid.tsx** — Grid of category cards on homepage
```tsx
// Map over categories, each with icon + name
// Click → navigate to /cari?kategori={slug}
```

---

## 5. Pages

### Homepage (src/app/page.tsx)
```
HEADER: Logo SIRKEL + Tagline
SEARCH BAR: Input besar + tombol Cari
SECTION: Kategori Populer (grid icons)
SECTION: Terpopuler (stat count per kategori)
SECTION: Produsen Terbaru (3-6 cards)
FOOTER: Simple
```

### Search Results (src/app/cari/page.tsx)
```
HEADER: Search bar (tetap di atas)
LEFT: FilterPanel (kategori, provinsi, tipe)
RIGHT: Results grid/list
  - "Menampilkan X hasil untuk 'susu kambing'"
  - Cards with: nama, alamat, telepon, WA button
  - Pagination (load more / infinite scroll)
```

### Detail Mitra (src/app/mitra/[id]/page.tsx)
```
BACK BUTTON ← Kembali ke hasil
HEADER: Nama perusahaan, badge tipe
CONTACT: Telepon [WA] [Telepon]
INFO: Alamat, Kota, Provinsi
DESCRIPTION: Deskripsi lengkap
PRODUK: Daftar produk (if any)
SOURCE: "Data dari {sumber_data}"
```

### Statistik (src/app/statistik/page.tsx)
```
HEADER: 📊 Statistik UMKM
SECTION: Jumlah total mitra, total produk
SECTION: Bar chart — mitra per provinsi (top 10)
SECTION: Bar chart — mitra per kategori (top 10)
FOOTNOTE: "Data diupdate: {tanggal}"
```

---

## 6. API Routes (optional — bisa langsung dari client)

If using Next.js API Routes instead of direct Supabase calls:

**GET /api/mitra**
```typescript
// Query params: q, kategori, provinsi, kota, tipe, page, limit
// Return: { data: Mitra[], total: number, page: number }
```

**GET /api/mitra/[id]**
```typescript
// Return: Mitra with produk[]
```

**GET /api/statistik**
```typescript
// Return: { total_mitra, per_provinsi, per_kategori, per_tipe }
```

But for MVP, you can just call Supabase directly from server components (RSC) — simpler, no API needed.

---

## 7. Color Palette & Style

```css
/* Tailwind config extensions */
primary:    "#059669"   /* emerald-600 — fresh, natural */
secondary:  "#F59E0B"   /* amber-500 — warm, UMKM vibe */
accent:     "#10B981"   /* emerald-500 */
neutral:    "#F3F4F6"   /* gray-100 */
dark:       "#1F2937"   /* gray-800 */
```

Design vibe:
- Clean, putih banyak white space
- Hijau alam (cocok buat produk alami UMKM)
- Card rounded-2xl with shadow
- Emojis sebagai icon kategori
- Responsive mobile-first

---

## 8. Data Flow

```
User buka SIRKEL
  ↓
Homepage (server component — fetch categories + recent mitra + stats)
  ↓
Search / Filter
  ↓
/cari?q=susu&provinsi=Jatim
  ↓
Supabase query:
  SELECT * FROM mitra 
  WHERE (nama ILIKE '%susu%' OR deskripsi ILIKE '%susu%')
  AND (provinsi = 'Jawa Timur' OR $1 = '')
  ORDER BY verified DESC, created_at DESC
  ↓
Result cards with WA buttons
  ↓
Klik card → /mitra/[id] (detail)
  ↓
Klik WA → wa.me/62xxx (external)
```

---

## 9. Key Supabase Queries

### Search mitra
```typescript
const { data } = await supabase
  .from('mitra')
  .select('*')
  .or(`nama_perusahaan.ilike.%${q}%,deskripsi.ilike.%${q}%`)
  .eq('provinsi', provinsi || '')
  .eq('kota', kota || '')
  .order('verified', { ascending: false })
  .range((page - 1) * limit, page * limit - 1);
```

### Mitra per kategori (for homepage stats)
```typescript
const { data } = await supabase
  .from('produk')
  .select('kategori_id, mitra_id(count)')
  .not('mitra_id', 'is', null);
```

### Top provinsi (for statistik page)
```typescript
const { data } = await supabase
  .from('mitra')
  .select('provinsi, count')
  .not('provinsi', 'is', null)
  .order('count', { ascending: false })
  .limit(10);
```

---

## 10. Deployment

```bash
# Railway
railway login
railway init
railway up

# Or Vercel
vercel --prod
```

Don't forget to add `.env` variables on Railway/Vercel dashboard.

---

## 11. Implementation Order (Recommended)

| Step | Task | Est. Time |
|:----:|------|:---------:|
| 1 | Create Next.js project + setup Supabase | 10 menit |
| 2 | Run SQL migration in Supabase dashboard | 5 menit |
| 3 | Seed data (kategori + sample mitra) | 10 menit |
| 4 | Build `lib/types.ts`, `lib/supabase.ts` | 5 menit |
| 5 | Build `SearchBar`, `KategoriGrid`, `CardMitra` | 30 menit |
| 6 | Build Homepage | 30 menit |
| 7 | Build Search Results page + FilterPanel | 45 menit |
| 8 | Build Detail Mitra page | 30 menit |
| 9 | Build Statistik page | 20 menit |
| 10 | Polish: responsive, loading states, empty states | 30 menit |
| 11 | Deploy | 10 menit |

**Total: ~3-4 jam**

---

## 12. Prompt untuk AI Coding

Copy-paste ini ke Antigravity:

```
Buat aplikasi Next.js 16 + Supabase + Tailwind untuk direktori UMKM bernama SIRKEL.

FITUR:
1. Homepage — kategori grid, search bar besar, statistik, produsen terbaru
2. Pencarian multi-filter — by keyword, kategori, provinsi
3. Halaman detail mitra — nama, alamat, telepon, tombol WA langsung
4. Halaman statistik — jumlah mitra per provinsi & kategori
5. No login, no auth, no marketplace, no transaksi

DESAIN:
- Warna: emerald-600 (#059669) primary, putih bersih, card rounded
- Mobile-first responsive
- Emoji sebagai icon kategori

DB SUPABASE:
Tabel: mitra (id, nama_perusahaan, tipe, no_telepon, alamat, kota, provinsi, deskripsi, sumber_data, verified, created_at)
Tabel: kategori (id, nama, slug, icon)
Tabel: produk (id, mitra_id FK, kategori_id FK, nama, deskripsi, satuan)

Buat semua komponen dalam src/components/.
Pages: / (home), /cari (search), /mitra/[id] (detail), /statistik
Gunakan server components dan Supabase client langsung (no API routes).
```

---

> 💡 **Tips untuk Antigravity:**
> - Beri prompt per-file, jangan sekaligus
> - Mulai dari types → lib → components → pages
> - Setelah base jadi, minta polish: loading skeleton, empty state, responsive
