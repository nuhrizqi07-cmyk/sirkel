'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { kategoriList, provinsiList } from '@/data/kategori';

export default function SearchBar({ large = false }: { large?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState('');
  const [provinsi, setProvinsi] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (kategori) params.set('kategori', kategori);
    if (provinsi) params.set('provinsi', provinsi);
    router.push(`/cari?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className={`flex ${large ? 'flex-col md:flex-row' : 'flex-col md:flex-row'} gap-2`}>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk, produsen, atau distributor..."
            className={`w-full pl-10 pr-4 ${large ? 'py-4 text-lg' : 'py-2.5 text-sm'} border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white`}
          />
        </div>
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className={`${large ? 'py-4' : 'py-2.5'} px-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        >
          <option value="">Semua Kategori</option>
          {kategoriList.map((k) => (
            <option key={k.id} value={k.slug}>{k.icon} {k.nama}</option>
          ))}
        </select>
        <select
          value={provinsi}
          onChange={(e) => setProvinsi(e.target.value)}
          className={`${large ? 'py-4' : 'py-2.5'} px-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        >
          <option value="">Semua Provinsi</option>
          {provinsiList.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button
          type="submit"
          className={`${large ? 'py-4 px-8 text-lg' : 'py-2.5 px-6'} bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors whitespace-nowrap`}
        >
          Cari
        </button>
      </div>
    </form>
  );
}
