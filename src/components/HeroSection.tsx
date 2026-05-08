import SearchBar from './ui/SearchBar';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-10 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
          Cari UMKM & Distributor
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-sm leading-6 text-gray-500 md:mb-8 md:text-lg">
          Temukan produsen, distributor, dan reseller UMKM di seluruh Indonesia.
          Lengkap dengan kontak langsung untuk follow up lebih cepat.
        </p>
        <SearchBar large />
      </div>
    </section>
  );
}
