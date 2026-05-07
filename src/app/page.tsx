import { hasSupabaseEnv, supabase } from '@/lib/supabase';
import HeroSection from '@/components/HeroSection';
import KategoriGrid from '@/components/KategoriGrid';
import MitraList from '@/components/MitraList';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getStats() {
  if (!supabase) {
    return { totalMitra: 0, totalProduk: 0 };
  }

  const { count: totalMitra } = await supabase
    .from('mitra')
    .select('*', { count: 'exact', head: true });

  const { count: totalProduk } = await supabase
    .from('produk')
    .select('*', { count: 'exact', head: true });

  return { totalMitra: totalMitra || 0, totalProduk: totalProduk || 0 };
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      <HeroSection />

      {!hasSupabaseEnv && (
        <section className="px-4 pt-6">
          <div className="max-w-5xl mx-auto rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase belum dikonfigurasi. Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan
            `NEXT_PUBLIC_SUPABASE_ANON_KEY` di environment deployment.
          </div>
        </section>
      )}
      
      {/* Stats bar */}
      <section className="py-6 px-4 -mt-4">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-emerald-600">{stats.totalMitra}</p>
            <p className="text-xs text-gray-400 mt-1">Produsen & Distributor</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-emerald-600">{stats.totalProduk}</p>
            <p className="text-xs text-gray-400 mt-1">Produk Terdaftar</p>
          </div>
          <Link href="/statistik" className="bg-white rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-emerald-600">{stats.totalMitra > 0 ? '📊' : '—'}</p>
            <p className="text-xs text-gray-400 mt-1">Lihat Statistik →</p>
          </Link>
        </div>
      </section>

      <KategoriGrid />
      <MitraList />

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center bg-emerald-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Punya Produk UMKM?
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Daftarkan bisnismu di SIRKEL biar distributor & reseller gampang nemuin kamu.
          </p>
          <a
            href="mailto:hello@sirkel.id"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            📩 Daftarkan Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
