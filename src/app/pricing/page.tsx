import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Pricing } from '@/components/sections/pricing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qiymətlər',
  description: 'BioScript üçün qiymət paketləri ilə tanış olun. Xəstəxana, aptek və korporativ ehtiyaclarınıza uyğun çevik həllər təklif edirik.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
      images: ['https://i.hizliresim.com/slj4kwk.png'],
  },
};

export default function PricingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
