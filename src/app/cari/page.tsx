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
        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="/" className="shrink-0 text-lg font-bold text-emerald-700">
                SIRKEL
              </a>
              <div className="flex-1">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
            Pencarian belum bisa dipakai karena environment Supabase belum diisi.
            Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`
            di environment deployment.
          </div>
        </div>
      </div>
    );
  }

  let query = supabase.from('mitra').select('*', { count: 'exact' });

  if (q) {
    query = query.or(`nama_perusahaan.ilike.%${q}%,deskripsi.ilike.%${q}%`);
  }

  if (kategori) {
    const { data: produkIds } = await supabase
      .from('produk')
      .select('mitra_id')
      .eq('kategori_id', kategori);

    if (produkIds && produkIds.length > 0) {
      const ids = produkIds.map((p) => p.mitra_id);
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
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/" className="shrink-0 text-lg font-bold text-emerald-700">
              SIRKEL
            </a>
            <div className="flex-1">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {hasFilters ? (
          <p className="mb-6 text-sm leading-6 text-gray-500">
            Menampilkan <strong>{total}</strong> hasil
            {q && <> untuk <strong>&ldquo;{q}&rdquo;</strong></>}
            {kategori && <> di kategori <strong>{kategori}</strong></>}
            {provinsi && <> di <strong>{provinsi}</strong></>}
          </p>
        ) : (
          <p className="mb-6 text-sm text-gray-500">
            <strong>{total}</strong> produsen & distributor terdaftar
          </p>
        )}

        <div className="mb-6 lg:hidden">
          <FilterPanel />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          <main className="flex-1">
            {mitras.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg font-medium text-gray-500">Tidak ada hasil ditemukan</p>
                <p className="mt-1 text-sm text-gray-400">Coba ubah kata kunci atau filter pencarian.</p>
                <a href="/cari" className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700">
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

                {totalPages > 1 && (
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    {page > 1 && (
                      <a
                        href={`/cari?${new URLSearchParams({ ...sp, page: String(page - 1) })}`}
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Sebelumnya
                      </a>
                    )}
                    <span className="text-sm text-gray-400">
                      Halaman {page} dari {totalPages}
                    </span>
                    {page < totalPages && (
                      <a
                        href={`/cari?${new URLSearchParams({ ...sp, page: String(page + 1) })}`}
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Selanjutnya
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
