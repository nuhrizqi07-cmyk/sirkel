// Types for SIRKEL UMKM Directory

export type TipeMitra = 'produsen' | 'distributor' | 'keduanya';

export interface Mitra {
  id: string;
  nama_perusahaan: string;
  tipe: TipeMitra;
  contact_person: string | null;
  no_telepon: string | null;
  email: string | null;
  alamat: string | null;
  kota: string | null;
  provinsi: string | null;
  deskripsi: string | null;
  sumber_data: string;
  url_sumber: string | null;
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
  harga_min: number | null;
  harga_max: number | null;
}

export interface Kategori {
  id: string;
  nama: string;
  slug: string;
  icon: string;
}
