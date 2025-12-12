import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL('https://bioscript.shop'),
  title: {
    default: 'BioScript | Səhiyyə Barmaqlarınızın Ucundadır!',
    template: '%s | BioScript',
  },
  description: 'BioScript — biometrik resept sistemi ilə səhiyyədə təhlükəsizliyi və səmərəliliyi artırın. Kağızsız, sürətli və etibarlı həll.',
  icons: {
    icon: 'https://old.bioscript.shop/wp-content/uploads/2025/03/cropped-Mavi-Modern-Disci-Logosu-2-192x192.png',
  },
   openGraph: {
    title: 'BioScript | Səhiyyə Barmaqlarınızın Ucundadır!',
    description: 'Biometrik resept sistemi ilə səhiyyədə təhlükəsizlik və səmərəlilik.',
    url: 'https://bioscript.shop',
    siteName: 'BioScript',
    images: [
      {
        url: 'https://i.hizliresim.com/slj4kwk.png', 
        width: 1200,
        height: 630,
        alt: 'BioScript Platforması',
      },
    ],
    locale: 'az_AZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
   twitter: {
    card: 'summary_large_image',
    title: 'BioScript | Səhiyyə Barmaqlarınızın Ucundadır!',
    description: 'BioScript — biometrik resept sistemi ilə səhiyyədə təhlükəsizliyi və səmərəliliyi artırın.',
    images: ['https://i.hizliresim.com/slj4kwk.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BioScript',
    url: 'https://bioscript.shop',
    logo: 'https://old.bioscript.shop/wp-content/uploads/2025/03/cropped-BioScript-1-1536x614.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+994-60-528-55-05',
      contactType: 'Customer Service',
      email: 'info@bioscript.shop',
    },
    sameAs: [
      'https://www.linkedin.com/company/105224304/',
      'https://www.instagram.com/bioscript.shop/',
    ],
  };

  return (
    <html lang="az" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background font-sans')}>
          {children}
          <Toaster />
      </body>
    </html>
  );
}
