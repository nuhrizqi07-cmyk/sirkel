import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <Link href="/" className="text-lg font-bold text-emerald-700">
              🟢 SIRKEL
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Sirkulasi Ekonomi Lokal — Temukan & terhubung dengan UMKM Indonesia
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/statistik" className="hover:text-emerald-600 transition-colors">
              Statistik
            </Link>
            <Link href="/cari" className="hover:text-emerald-600 transition-colors">
              Cari
            </Link>
            <a href="mailto:hello@sirkel.id" className="hover:text-emerald-600 transition-colors">
              Kontak
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-50 text-center text-xs text-gray-300">
          Data dikumpulkan dari sumber terbuka. Hubungi kami untuk koreksi data.
        </div>
      </div>
    </footer>
  );
}
