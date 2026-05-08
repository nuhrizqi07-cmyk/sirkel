import Link from 'next/link';
import { hasSupabaseEnv, supabase } from '@/lib/supabase';
import HeroSection from '@/components/HeroSection';
import KategoriGrid from '@/components/KategoriGrid';
import MitraList from '@/components/MitraList';

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
          <div className="mx-auto max-w-5xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase belum dikonfigurasi. Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan
            `NEXT_PUBLIC_SUPABASE_ANON_KEY` di environment deployment.
          </div>
        </section>
      )}

      <section className="-mt-4 px-4 py-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-emerald-600">{stats.totalMitra}</p>
            <p className="mt-1 text-xs text-gray-400">Produsen & Distributor</p>
          </div>
          <div className="rounded-xl bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-emerald-600">{stats.totalProduk}</p>
            <p className="mt-1 text-xs text-gray-400">Produk Terdaftar</p>
          </div>
          <Link href="/statistik" className="rounded-xl bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
            <p className="text-2xl font-bold text-emerald-600">{stats.totalMitra > 0 ? 'Stat' : '--'}</p>
            <p className="mt-1 text-xs text-gray-400">Lihat statistik</p>
          </Link>
        </div>
      </section>

      <KategoriGrid />
      <MitraList />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-emerald-50 p-6 text-center sm:p-8 md:p-12">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Punya Produk UMKM?
          </h2>
          <p className="mx-auto mb-6 max-w-md text-gray-500">
            Daftarkan bisnismu di SIRKEL biar distributor dan reseller lebih mudah menemukan kamu.
          </p>
          <a
            href="mailto:hello@sirkel.id"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Daftarkan sekarang
          </a>
        </div>
      </section>
    </>
  );
}
