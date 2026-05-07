'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { kategoriList, provinsiList } from '@/data/kategori';

export default function FilterPanel() {
  const router = useRouter();
  const params = useSearchParams();

  const activeKategori = params.get('kategori') || '';
  const activeProvinsi = params.get('provinsi') || '';
  const activeTipe = params.get('tipe') || '';

  function setFilter(key: string, value: string) {
    const newParams = new URLSearchParams(params.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    router.push(`/cari?${newParams.toString()}`);
  }

  function resetAll() {
    const q = params.get('q');
    const p = q ? `?q=${q}` : '';
    router.push(`/cari${p}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">Filter</h3>
        <button onClick={resetAll} className="text-xs text-emerald-600 hover:text-emerald-700">
          Reset
        </button>
      </div>

      {/* Kategori */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</label>
        <select
          value={activeKategori}
          onChange={(e) => setFilter('kategori', e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Semua</option>
          {kategoriList.map((k) => (
            <option key={k.id} value={k.slug}>{k.icon} {k.nama}</option>
          ))}
        </select>
      </div>

      {/* Provinsi */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Provinsi</label>
        <select
          value={activeProvinsi}
          onChange={(e) => setFilter('provinsi', e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Semua</option>
          {provinsiList.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Tipe */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</label>
        <select
          value={activeTipe}
          onChange={(e) => setFilter('tipe', e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Semua</option>
          <option value="produsen">🏭 Produsen</option>
          <option value="distributor">🏪 Distributor</option>
          <option value="keduanya">🤝 Keduanya</option>
        </select>
      </div>
    </div>
  );
}
