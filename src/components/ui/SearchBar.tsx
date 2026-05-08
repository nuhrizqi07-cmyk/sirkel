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
      <div className={`flex flex-col gap-2 ${large ? 'lg:flex-row' : 'md:flex-row'}`}>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
            Cari
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk, produsen, atau distributor..."
            className={`w-full rounded-xl border border-gray-200 bg-white pl-14 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 ${large ? 'py-4 text-base md:text-lg' : 'py-3 text-sm'}`}
          />
        </div>

        <div className={`grid grid-cols-1 gap-2 ${large ? 'sm:grid-cols-2 lg:flex' : 'sm:grid-cols-2 md:flex'}`}>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className={`rounded-xl border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${large ? 'min-w-[12rem] py-4' : 'py-3 md:min-w-[10rem]'}`}
          >
            <option value="">Semua Kategori</option>
            {kategoriList.map((k) => (
              <option key={k.id} value={k.slug}>{k.icon} {k.nama}</option>
            ))}
          </select>

          <select
            value={provinsi}
            onChange={(e) => setProvinsi(e.target.value)}
            className={`rounded-xl border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${large ? 'min-w-[12rem] py-4' : 'py-3 md:min-w-[10rem]'}`}
          >
            <option value="">Semua Provinsi</option>
            {provinsiList.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full whitespace-nowrap rounded-xl bg-emerald-600 text-white font-semibold transition-colors hover:bg-emerald-700 sm:w-auto ${large ? 'px-8 py-4 text-base md:text-lg' : 'px-6 py-3'}`}
        >
          Cari
        </button>
      </div>
    </form>
  );
}
