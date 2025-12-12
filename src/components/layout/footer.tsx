'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="border-t bg-background/50"
    >
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/">
              <Logo className="h-16 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              BioScript — səhiyyə üçün biometrik resept və elektron identifikasiya sistemi.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="https://www.linkedin.com/company/105224304/" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/bioscript.shop/?__pwa=1" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Səhifələr</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">Haqqımızda</Link></li>
              <li><Link href="/product" className="text-muted-foreground hover:text-primary">Məhsulumuz</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">Qiymətlər</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Dəstək</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Əlaqə</Link></li>
              <li><Link href="/request-demo" className="text-muted-foreground hover:text-primary">Demo Tələb Et</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Gizlilik Siyasəti</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Əlaqə</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Naxçıvan şəhəri, Əziz Əliyev küçəsi, 4</li>
              <li>info@bioscript.shop</li>
              <li>+994 60 528 55 05</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BioScript. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </motion.footer>
  );
}
