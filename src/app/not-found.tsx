'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <motion.main
        className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl font-bold text-primary"
          variants={itemVariants}
        >
          404
        </motion.h1>
        <motion.h2
          className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          variants={itemVariants}
        >
          Səhifə Tapılmadı
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Üzr istəyirik, axtardığınız səhifə mövcud deyil və ya başqa ünvana daşınıb.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button asChild className="mt-8">
            <Link href="/">Ana Səhifəyə Qayıt</Link>
          </Button>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}
