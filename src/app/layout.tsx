import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SIRKEL - Direktori UMKM Indonesia',
  description: 'Temukan produsen, distributor, dan reseller UMKM di seluruh Indonesia. Lengkap dengan kontak langsung WhatsApp.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
