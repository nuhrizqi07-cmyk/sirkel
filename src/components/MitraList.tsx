import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import CardMitra from './ui/CardMitra';
import type { Mitra } from '@/lib/types';

export default async function MitraTerbaru() {
  if (!supabase) {
    return (
      <section className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Produsen Terbaru</h2>
          <div className="rounded-2xl bg-gray-50 p-10 text-center">
            <p className="text-gray-400">Data belum tersedia karena koneksi Supabase belum dikonfigurasi.</p>
          </div>
        </div>
      </section>
    );
  }

  const { data } = await supabase
    .from('mitra')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  const mitras = (data || []) as Mitra[];

  if (mitras.length === 0) {
    return (
      <section className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Produsen Terbaru</h2>
          <div className="rounded-2xl bg-gray-50 p-10 text-center">
            <p className="text-gray-400">Belum ada data. Import data UMKM melalui panel admin.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900">Mitra Terbaru</h2>
          <Link href="/cari" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            Lihat semua
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mitras.map((m) => (
            <CardMitra key={m.id} mitra={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
