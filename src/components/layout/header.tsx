'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Ana Səhifə' },
  { href: '/about', label: 'Haqqımızda' },
  { href: '/product', label: 'Məhsulumuz' },
  { href: '/pricing', label: 'Qiymətlər' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Əlaqə' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur-xl"
    >
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-16 w-auto" />
          </Link>
          <nav className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-2 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menyu aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass-card border-r">
              <div className="flex flex-col p-6">
                <Link href="/" className="mb-8" onClick={handleLinkClick}>
                  <Logo />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 flex flex-col gap-4">
                    <Button asChild>
                      <Link href="/request-demo" onClick={handleLinkClick}>Demo Tələb Et</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden items-center space-x-2 md:flex">
              <Button asChild>
                <Link href="/request-demo">Demo Tələb Et</Link>
              </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
