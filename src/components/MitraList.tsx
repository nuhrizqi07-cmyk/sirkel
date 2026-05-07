import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import CardMitra from './ui/CardMitra';
import type { Mitra } from '@/lib/types';

export default async function MitraTerbaru() {
  const { data } = await supabase
    .from('mitra')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  const mitras = (data || []) as Mitra[];

  if (mitras.length === 0) {
    return (
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">👥 Produsen Terbaru</h2>
          <div className="bg-gray-50 rounded-2xl p-10 text-center">
            <p className="text-gray-400">Belum ada data. Import data UMKM melalui panel admin.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">👥 Produsen Terbaru</h2>
          <Link href="/cari" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mitras.map((m) => (
            <CardMitra key={m.id} mitra={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
