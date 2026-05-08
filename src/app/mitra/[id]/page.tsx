import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ButtonWA, ButtonTel } from '@/components/ui/ButtonWA';
import { tipeBadgeColor } from '@/lib/utils';
import type { Mitra, Produk } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function MitraDetail({ params }: Props) {
  const { id } = await params;

  if (!supabase) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <a href="/cari" className="text-sm text-gray-400 transition-colors hover:text-emerald-600">
              Kembali ke pencarian
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
            Detail mitra belum bisa dimuat karena environment Supabase belum diisi.
          </div>
        </div>
      </div>
    );
  }

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
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <a href="/cari" className="text-sm text-gray-400 transition-colors hover:text-emerald-600">
            Kembali ke pencarian
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{m.nama_perusahaan}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tipeBadgeColor(m.tipe)}`}>
                {m.tipe}
              </span>
              {m.verified && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-600">
                  Terverifikasi
                </span>
              )}
              <span className="text-xs text-gray-400">{m.sumber_data}</span>
            </div>
          </div>
        </div>

        {m.no_telepon && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonWA phone={m.no_telepon} />
            <ButtonTel phone={m.no_telepon} />
          </div>
        )}

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {m.contact_person && (
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Contact Person</p>
              <p className="font-medium text-gray-800">{m.contact_person}</p>
            </div>
          )}
          {m.email && (
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Email</p>
              <a href={`mailto:${m.email}`} className="break-all font-medium text-emerald-600 hover:text-emerald-700">
                {m.email}
              </a>
            </div>
          )}
          {(m.kota || m.provinsi) && (
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Lokasi</p>
              <p className="font-medium text-gray-800">
                {[m.kota, m.provinsi].filter(Boolean).join(', ')}
              </p>
            </div>
          )}
          {m.alamat && (
            <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
              <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Alamat Lengkap</p>
              <p className="font-medium text-gray-800">{m.alamat}</p>
            </div>
          )}
          {m.deskripsi && (
            <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
              <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Deskripsi</p>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-600">{m.deskripsi}</p>
            </div>
          )}
        </div>

        {m.produk && m.produk.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-gray-900">Produk</h2>
            <div className="space-y-3">
              {m.produk.map((p) => (
                <div key={p.id} className="rounded-xl border border-gray-100 p-4">
                  <h3 className="font-semibold text-gray-800">{p.nama}</h3>
                  {p.deskripsi && (
                    <p className="mt-1 text-sm text-gray-500">{p.deskripsi}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400">
                    {p.satuan && <span>Satuan: {p.satuan}</span>}
                    {p.harga_min && <span>Mulai: Rp {p.harga_min.toLocaleString('id-ID')}</span>}
                    {p.harga_max && <span>Sampai: Rp {p.harga_max.toLocaleString('id-ID')}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {m.url_sumber && (
          <p className="mt-8 break-all text-xs text-gray-300">
            Data dari{' '}
            <a href={m.url_sumber} target="_blank" rel="noopener noreferrer" className="underline">
              {m.url_sumber}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
