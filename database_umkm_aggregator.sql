-- =====================================================
-- DATABASE UMKM AGGREGATOR / DISTRIBUTOR
-- Target: Supabase (PostgreSQL)
-- =====================================================

-- 1. KATEGORI PRODUK
CREATE TABLE kategori (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50),
    deskripsi TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MITRA (Produsen & Distributor)
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
    kode_pos VARCHAR(10),
    website VARCHAR(200),
    deskripsi TEXT,
    sumber_data VARCHAR(50) DEFAULT 'manual',  -- 'manual', 'indonetwork', 'gmaps', 'facebook'
    url_sumber TEXT,                            -- link ke sumber asli
    verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUK (Yang dijual oleh produsen)
CREATE TABLE produk (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mitra_id UUID NOT NULL REFERENCES mitra(id) ON DELETE CASCADE,
    kategori_id UUID REFERENCES kategori(id),
    nama VARCHAR(200) NOT NULL,
    deskripsi TEXT,
    satuan VARCHAR(30),                        -- kg, liter, box, pcs, dll
    harga_min NUMERIC(12,0),                   -- harga per satuan (range bawah)
    harga_max NUMERIC(12,0),                   -- harga per satuan (range atas)
    stok_tersedia BOOLEAN DEFAULT TRUE,
    min_order VARCHAR(50),                     -- minimal pembelian
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PERMINTAAN (Yang dicari distributor)
CREATE TABLE permintaan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mitra_id UUID NOT NULL REFERENCES mitra(id) ON DELETE CASCADE,
    kategori_id UUID REFERENCES kategori(id),
    nama_produk VARCHAR(200) NOT NULL,
    deskripsi TEXT,
    jumlah_dibutuhkan VARCHAR(100),            -- "50 kg/minggu", "100 liter", dll
    harga_offer NUMERIC(12,0),                 -- harga yang ditawarkan
    lokasi_tujuan VARCHAR(200),                -- daerah pengiriman
    status VARCHAR(20) DEFAULT 'aktif',        -- 'aktif', 'terpenuhi', 'ditutup'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PENCATATAN KONTAK / MATCH
CREATE TYPE status_match AS ENUM ('baru', 'dihubungi', 'deal', 'gagal', 'selesai');

CREATE TABLE matchmaking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    produk_id UUID REFERENCES produk(id) ON DELETE SET NULL,
    permintaan_id UUID REFERENCES permintaan(id) ON DELETE SET NULL,
    pencatat_id UUID REFERENCES mitra(id),     -- siapa yang mencatat match ini
    catatan TEXT,
    status status_match DEFAULT 'baru',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES biar query cepet
-- =====================================================
CREATE INDEX idx_mitra_kota ON mitra(kota);
CREATE INDEX idx_mitra_provinsi ON mitra(provinsi);
CREATE INDEX idx_mitra_tipe ON mitra(tipe);
CREATE INDEX idx_produk_kategori ON produk(kategori_id);
CREATE INDEX idx_permintaan_kategori ON permintaan(kategori_id);
CREATE INDEX idx_permintaan_status ON permintaan(status);
CREATE INDEX idx_produk_mitra ON produk(mitra_id);

-- =====================================================
-- SEEDER: Kategori Produk UMKM
-- =====================================================
INSERT INTO kategori (nama, slug, icon, deskripsi) VALUES
    ('Susu & Olahan Susu', 'susu-olahan', '🥛', 'Susu segar, susu bubuk, yoghurt, keju, dll'),
    ('Madu & Herbal', 'madu-herbal', '🍯', 'Madu murni, herbal, jamu tradisional'),
    ('Kopi & Teh', 'kopi-teh', '☕', 'Kopi bubuk, kopi specialty, teh herbal'),
    ('Makanan Ringan', 'makanan-ringan', '🍪', 'Kripik, kue kering, camilan tradisional'),
    ('Makanan Basah', 'makanan-basah', '🍲', 'Makanan siap saji, frozen food, basah'),
    ('Minuman', 'minuman', '🧃', 'Minuman kemasan, sari buah, sirup'),
    ('Bumbu & Rempah', 'bumbu-rempah', '🌶️', 'Bumbu masak, rempah-rempah, sambal'),
    ('Beras & Pangan Pokok', 'beras-pangan', '🍚', 'Beras, jagung, sagu, tepung'),
    ('Hasil Ternak', 'hasil-ternak', '🐄', 'Daging, telur, ikan, susu segar'),
    ('Kerajinan', 'kerajinan', '🎨', 'Kerajinan tangan, batik, anyaman'),
    ('Kosmetik & Perawatan', 'kosmetik', '🧴', 'Sabun herbal, lotion, kosmetik alami'),
    ('Lainnya', 'lainnya', '📦', 'Produk UMKM lainnya');

-- =====================================================
-- SEEDER: Contoh Data dari Hasil Scraping
-- =====================================================

-- Contoh produsen susu kambing
INSERT INTO mitra (nama_perusahaan, tipe, no_telepon, alamat, kota, provinsi, deskripsi, sumber_data, url_sumber) VALUES
    ('Pabrik Susu Kambing Etawa SANIGUNA', 'produsen', '0878-3744-7636', 'Jl. Kemirikebo No.1/7', 'Sleman', 'DIY', 'Produsen susu kambing etawa', 'gmaps', 'https://maps.google.com'),
    ('Produsen Susu Kambing Etawa Naga SP & Go Jack', 'produsen', '0853-3636-0070', 'Demak Tim. VI No.15', 'Surabaya', 'Jawa Timur', 'Produsen susu kambing etawa dan produk turunan', 'gmaps', 'https://maps.google.com'),
    ('SUSU KAMBING ETAWA "RaRa" (susu segar)', 'produsen', '0812-5254-5591', 'Perum Griya Asri Blok M-17, Blimbing', 'Malang', 'Jawa Timur', 'Pemasok susu kambing segar', 'gmaps', 'https://maps.google.com'),
    ('Distributor Susu Kambing Etawa Bubuk Supergoat', 'distributor', '0821-3361-6544', 'Perum TSG A6 Jl. Raya Jaretan No.9', 'Sidoarjo', 'Jawa Timur', 'Distributor susu kambing bubuk', 'gmaps', 'https://maps.google.com'),
    ('Suka As-Syifa Farm', 'produsen', NULL, 'Jl. Kaliurang Km 21, Pakem', 'Sleman', 'DIY', 'Peternakan kambing etawa, susu segar, yoghurt', 'indonetwork', 'https://indonetwork.co.id/company/sukaas-syifa'),
    ('Agen Susu Kambing Etawa Bubuk SKILL', 'distributor', '0812-3358-6344', 'Puri Indah, Blk. BA No.19', NULL, NULL, 'Agen susu kambing etawa bubuk', 'gmaps', 'https://maps.google.com'),
    ('Susu Kambing Victory', 'produsen', NULL, 'Jl. Abd Fatah 12', 'Tulungagung', 'Jawa Timur', 'Produsen susu kambing bubuk', 'indonetwork', 'https://indonetwork.co.id'),
    ('Distributor Susu Kambing', 'distributor', NULL, 'Griya Asri Serpong Blok A5 No.13', 'Tangerang Selatan', 'Banten', 'Distributor berbagai merek susu kambing', 'indonetwork', 'https://indonetwork.co.id');
