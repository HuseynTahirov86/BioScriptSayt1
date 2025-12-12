import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Advantages } from '@/components/sections/advantages';
import { HowItWorks } from '@/components/sections/how-it-works';
import { AiAssistant } from '@/components/sections/ai-assistant';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Məhsulumuz',
  description: 'BioScript-in iş prinsipi, üstünlükləri və süni zəka dəstəyi haqqında məlumat. Biometrik resept sisteminin səhiyyəni necə təkmilləşdirdiyini öyrənin.',
  alternates: {
    canonical: '/product',
  },
  openGraph: {
      images: ['https://i.hizliresim.com/slj4kwk.png'],
  },
};

export default function ProductPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <HowItWorks />
        <AiAssistant />
        <Advantages />
      </main>
      <Footer />
    </div>
  );
}
