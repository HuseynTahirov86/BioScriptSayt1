import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Demo } from '@/components/sections/demo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo Tələb Et',
  description: 'BioScript platformasını canlı görmək üçün fərdi demo tələb edin. Formu doldurun, komandamız sizinlə əlaqə saxlasın.',
  alternates: {
    canonical: '/request-demo',
  },
  openGraph: {
      images: ['https://i.hizliresim.com/slj4kwk.png'],
  },
};

export default function RequestDemoPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Demo />
      </main>
      <Footer />
    </div>
  );
}
