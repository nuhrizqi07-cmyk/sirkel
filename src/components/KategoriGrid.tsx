import Link from 'next/link';
import { kategoriList } from '@/data/kategori';

export default function KategoriGrid() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-6 text-xl font-bold text-gray-900">Kategori Produk</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {kategoriList.map((k) => (
            <Link
              key={k.id}
              href={`/cari?kategori=${k.slug}`}
              className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
            >
              <span className="text-2xl">{k.icon}</span>
              <span className="text-xs font-medium leading-tight text-gray-600 sm:text-sm">
                {k.nama}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
