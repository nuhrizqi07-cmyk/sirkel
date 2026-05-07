import SearchBar from './ui/SearchBar';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
          Cari UMKM & Distributor
        </h1>
        <p className="text-gray-500 text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Temukan produsen, distributor, dan reseller UMKM di seluruh Indonesia.
          Lengkap dengan kontak — tinggal chat langsung!
        </p>
        <SearchBar large />
      </div>
    </section>
  );
}
