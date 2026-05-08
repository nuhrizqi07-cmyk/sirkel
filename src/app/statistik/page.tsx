import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function StatistikPage() {
  if (!supabase) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <Link href="/" className="text-lg font-bold text-emerald-700">
              SIRKEL
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
            Statistik belum tersedia karena environment Supabase belum dikonfigurasi.
          </div>
        </div>
      </div>
    );
  }

  const { count: totalMitra } = await supabase.from('mitra').select('*', { count: 'exact', head: true });
  const { count: totalProduk } = await supabase.from('produk').select('*', { count: 'exact', head: true });

  const { data: perProvinsi } = await supabase
    .from('mitra')
    .select('provinsi')
    .not('provinsi', 'is', null);

  const provCounts: Record<string, number> = {};
  (perProvinsi || []).forEach((m) => {
    if (m.provinsi) provCounts[m.provinsi] = (provCounts[m.provinsi] || 0) + 1;
  });
  const topProvinsi = Object.entries(provCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const { data: perTipe } = await supabase
    .from('mitra')
    .select('tipe');

  const tipeCounts: Record<string, number> = {};
  (perTipe || []).forEach((m) => {
    tipeCounts[m.tipe] = (tipeCounts[m.tipe] || 0) + 1;
  });

  const maxTipeCount = Math.max(...Object.values(tipeCounts), 1);
  const maxProvCount = topProvinsi[0]?.[1] || 1;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <Link href="/" className="text-lg font-bold text-emerald-700">
            SIRKEL
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Statistik UMKM</h1>
        <p className="mb-8 text-sm text-gray-400">Data dikumpulkan dari berbagai sumber terbuka.</p>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
            <p className="text-3xl font-bold text-emerald-700">{totalMitra || 0}</p>
            <p className="mt-1 text-sm text-emerald-600">Total Produsen & Distributor</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-6">
            <p className="text-3xl font-bold text-amber-700">{totalProduk || 0}</p>
            <p className="mt-1 text-sm text-amber-600">Total Produk Terdaftar</p>
          </div>
        </div>

        {Object.keys(tipeCounts).length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Berdasarkan Tipe</h2>
            <div className="space-y-3">
              {Object.entries(tipeCounts).map(([tipe, count]) => (
                <div key={tipe} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="w-full text-sm font-medium capitalize text-gray-600 sm:w-28">{tipe}</span>
                  <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${(count / maxTipeCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-full text-right text-sm font-semibold text-gray-700 sm:w-12">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {topProvinsi.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-gray-900">Berdasarkan Provinsi (Top 10)</h2>
            <div className="space-y-3">
              {topProvinsi.map(([prov, count], i) => (
                <div key={prov} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="w-full text-sm font-medium text-gray-400 sm:w-8">#{i + 1}</span>
                  <span className="w-full truncate text-sm font-medium text-gray-600 sm:w-40">{prov}</span>
                  <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${(count / maxProvCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-full text-right text-sm font-semibold text-gray-700 sm:w-12">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalMitra === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500">Belum ada data. Import data UMKM untuk melihat statistik.</p>
          </div>
        )}

        <p className="mt-10 text-xs text-gray-300">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}
