import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ButtonWA, ButtonTel } from '@/components/ui/ButtonWA';
import { tipeBadgeColor } from '@/lib/utils';
import type { Mitra, Produk } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MitraDetail({ params }: Props) {
  const { id } = await params;

  const { data: mitra } = await supabase
    .from('mitra')
    .select(`
      *,
      produk (*)
    `)
    .eq('id', id)
    .single();

  if (!mitra) {
    notFound();
  }

  const m = mitra as Mitra & { produk: Produk[] };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <a href="/cari" className="text-sm text-gray-400 hover:text-emerald-600 transition-colors">
            ← Kembali ke pencarian
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Nama & Badge */}
        <div className="flex items-start gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{m.nama_perusahaan}</h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tipeBadgeColor(m.tipe)}`}>
                {m.tipe}
              </span>
              {m.verified && (
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  ✅ Terverifikasi
                </span>
              )}
              <span className="text-xs text-gray-400">{m.sumber_data}</span>
            </div>
          </div>
        </div>

        {/* Contact Buttons */}
        {m.no_telepon && (
          <div className="flex flex-wrap gap-3 mb-6">
            <ButtonWA phone={m.no_telepon} />
            <ButtonTel phone={m.no_telepon} />
          </div>
        )}

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {m.contact_person && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Contact Person</p>
              <p className="font-medium text-gray-800">{m.contact_person}</p>
            </div>
          )}
          {m.email && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
              <a href={`mailto:${m.email}`} className="font-medium text-emerald-600 hover:text-emerald-700">
                {m.email}
              </a>
            </div>
          )}
          {(m.kota || m.provinsi) && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Lokasi</p>
              <p className="font-medium text-gray-800">
                {[m.kota, m.provinsi].filter(Boolean).join(', ')}
              </p>
            </div>
          )}
          {m.alamat && (
            <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Alamat Lengkap</p>
              <p className="font-medium text-gray-800">📍 {m.alamat}</p>
            </div>
          )}
          {m.deskripsi && (
            <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Deskripsi</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{m.deskripsi}</p>
            </div>
          )}
        </div>

        {/* Products */}
        {m.produk && m.produk.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">📦 Produk</h2>
            <div className="space-y-3">
              {m.produk.map((p) => (
                <div key={p.id} className="border border-gray-100 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800">{p.nama}</h3>
                  {p.deskripsi && (
                    <p className="text-sm text-gray-500 mt-1">{p.deskripsi}</p>
                  )}
                  <div className="flex gap-3 mt-2 text-xs text-gray-400">
                    {p.satuan && <span>Satuan: {p.satuan}</span>}
                    {p.harga_min && <span>Mulai: Rp {p.harga_min.toLocaleString('id-ID')}</span>}
                    {p.harga_max && <span>s/d Rp {p.harga_max.toLocaleString('id-ID')}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Source */}
        {m.url_sumber && (
          <p className="mt-8 text-xs text-gray-300">
            Data dari: <a href={m.url_sumber} target="_blank" rel="noopener noreferrer" className="underline">
              {m.url_sumber}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
