import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function StatistikPage() {
  // Total counts
  const { count: totalMitra } = await supabase.from('mitra').select('*', { count: 'exact', head: true });
  const { count: totalProduk } = await supabase.from('produk').select('*', { count: 'exact', head: true });

  // Per provinsi
  const { data: perProvinsi } = await supabase
    .from('mitra')
    .select('provinsi')
    .not('provinsi', 'is', null);

  const provCounts: Record<string, number> = {};
  (perProvinsi || []).forEach(m => {
    if (m.provinsi) provCounts[m.provinsi] = (provCounts[m.provinsi] || 0) + 1;
  });
  const topProvinsi = Object.entries(provCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  // Per tipe
  const { data: perTipe } = await supabase
    .from('mitra')
    .select('tipe');

  const tipeCounts: Record<string, number> = {};
  (perTipe || []).forEach(m => {
    tipeCounts[m.tipe] = (tipeCounts[m.tipe] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link href="/" className="text-lg font-bold text-emerald-700">
            🟢 SIRKEL
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">📊 Statistik UMKM</h1>
        <p className="text-sm text-gray-400 mb-8">Data dikumpulkan dari berbagai sumber terbuka</p>

        {/* Total cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6">
            <p className="text-3xl font-bold text-emerald-700">{totalMitra || 0}</p>
            <p className="text-sm text-emerald-600 mt-1">Total Produsen & Distributor</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6">
            <p className="text-3xl font-bold text-amber-700">{totalProduk || 0}</p>
            <p className="text-sm text-amber-600 mt-1">Total Produk Terdaftar</p>
          </div>
        </div>

        {/* Per Tipe */}
        {Object.keys(tipeCounts).length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Berdasarkan Tipe</h2>
            <div className="space-y-3">
              {Object.entries(tipeCounts).map(([tipe, count]) => (
                <div key={tipe} className="flex items-center gap-4">
                  <span className="w-28 text-sm font-medium text-gray-600 capitalize">{tipe}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${(count / Math.max(...Object.values(tipeCounts))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Per Provinsi */}
        {topProvinsi.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Berdasarkan Provinsi (Top 10)</h2>
            <div className="space-y-3">
              {topProvinsi.map(([prov, count], i) => (
                <div key={prov} className="flex items-center gap-4">
                  <span className="w-8 text-sm text-gray-400 font-medium">#{i + 1}</span>
                  <span className="w-40 text-sm font-medium text-gray-600 truncate">{prov}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${(count / topProvinsi[0][1]) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {totalMitra === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📭</p>
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
