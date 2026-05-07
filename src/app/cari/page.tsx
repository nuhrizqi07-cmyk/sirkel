import { supabase } from '@/lib/supabase';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import CardMitra from '@/components/ui/CardMitra';
import type { Mitra } from '@/lib/types';

interface Props {
  searchParams: Promise<{ q?: string; kategori?: string; provinsi?: string; tipe?: string; page?: string }>;
}

const LIMIT = 12;

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q || '';
  const kategori = sp.kategori || '';
  const provinsi = sp.provinsi || '';
  const tipe = sp.tipe || '';
  const page = parseInt(sp.page || '1', 10);

  if (!supabase) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3 mb-3">
              <a href="/" className="text-lg font-bold text-emerald-700 shrink-0">
                SIRKEL
              </a>
              <div className="flex-1">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
            Pencarian belum bisa dipakai karena environment Supabase belum diisi.
            Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`
            di environment deployment.
          </div>
        </div>
      </div>
    );
  }

  // Build query
  let query = supabase.from('mitra').select('*', { count: 'exact' });

  // Full-text search on name & description
  if (q) {
    query = query.or(`nama_perusahaan.ilike.%${q}%,deskripsi.ilike.%${q}%`);
  }

  // Filter by kategori (through produk table)
  if (kategori) {
    const { data: produkIds } = await supabase
      .from('produk')
      .select('mitra_id')
      .eq('kategori_id', kategori);
    
    if (produkIds && produkIds.length > 0) {
      const ids = produkIds.map(p => p.mitra_id);
      query = query.in('id', ids);
    }
  }

  if (provinsi) {
    query = query.eq('provinsi', provinsi);
  }

  if (tipe) {
    query = query.eq('tipe', tipe);
  }

  const from = (page - 1) * LIMIT;
  const to = from + LIMIT - 1;
  const { data, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  const mitras = (data || []) as Mitra[];
  const total = count || 0;
  const totalPages = Math.ceil(total / LIMIT);

  const hasFilters = q || kategori || provinsi || tipe;

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <a href="/" className="text-lg font-bold text-emerald-700 shrink-0">
              🟢 SIRKEL
            </a>
            <div className="flex-1">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {hasFilters ? (
          <p className="text-sm text-gray-500 mb-6">
            Menampilkan <strong>{total}</strong> hasil
            {q && <> untuk &ldquo;<strong>{q}</strong>&rdquo;</>}
            {kategori && <> di kategori <strong>{kategori}</strong></>}
            {provinsi && <> di <strong>{provinsi}</strong></>}
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            <strong>{total}</strong> produsen & distributor terdaftar
          </p>
        )}

        <div className="flex gap-6">
          {/* Sidebar Filter — desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {mitras.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-gray-500 font-medium">Tidak ada hasil ditemukan</p>
                <p className="text-sm text-gray-400 mt-1">Coba ubah kata kunci atau filter pencarian</p>
                <a href="/cari" className="inline-block mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Reset pencarian
                </a>
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  {mitras.map((m) => (
                    <CardMitra key={m.id} mitra={m} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {page > 1 && (
                      <a
                        href={`/cari?${new URLSearchParams({ ...sp, page: String(page - 1) })}`}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                      >
                        ← Sebelumnya
                      </a>
                    )}
                    <span className="text-sm text-gray-400">
                      Halaman {page} dari {totalPages}
                    </span>
                    {page < totalPages && (
                      <a
                        href={`/cari?${new URLSearchParams({ ...sp, page: String(page + 1) })}`}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                      >
                        Selanjutnya →
                      </a>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
