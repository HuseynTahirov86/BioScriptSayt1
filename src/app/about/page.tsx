import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { About } from '@/components/sections/about';
import { Team } from '@/components/sections/team';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Haqqımızda',
  description: 'BioScript layihəsinin məqsədi, komandası və hekayəsi haqqında ətraflı məlumat. Səhiyyəni necə dəyişdirdiyimizi öyrənin.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
      images: ['https://i.hizliresim.com/slj4kwk.png'],
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <About />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
