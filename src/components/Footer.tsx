import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="text-left">
            <Link href="/" className="text-lg font-bold text-emerald-700">
              SIRKEL
            </Link>
            <p className="mt-1 text-sm text-gray-400">
              Sirkulasi Ekonomi Lokal. Temukan dan terhubung dengan UMKM Indonesia.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/statistik" className="transition-colors hover:text-emerald-600">
              Statistik
            </Link>
            <Link href="/cari" className="transition-colors hover:text-emerald-600">
              Cari
            </Link>
            <a href="mailto:hello@sirkel.id" className="transition-colors hover:text-emerald-600">
              Kontak
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-50 pt-6 text-center text-xs text-gray-300">
          Data dikumpulkan dari sumber terbuka. Hubungi kami untuk koreksi data.
        </div>
      </div>
    </footer>
  );
}
