import Link from 'next/link';
import { kategoriList } from '@/data/kategori';

export default function KategoriGrid() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📂 Kategori Produk</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {kategoriList.map((k) => (
            <Link
              key={k.id}
              href={`/cari?kategori=${k.slug}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
            >
              <span className="text-2xl">{k.icon}</span>
              <span className="text-xs text-gray-600 text-center font-medium leading-tight">
                {k.nama}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
