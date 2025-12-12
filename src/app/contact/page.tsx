import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Contact } from '@/components/sections/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Əlaqə',
  description: 'BioScript komandası ilə əlaqə saxlayın. Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizə yazın. Formu doldurun və ya əlaqə məlumatlarımızdan istifadə edin.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
      images: ['https://i.hizliresim.com/slj4kwk.png'],
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
