'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function Hero() {
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
    <section id="home" className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Səhiyyə Barmağınızın Ucundadır!
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-muted-foreground"
            >
              Səhiyyənin gələcəyini biometriya ilə təmin edən BioScript, resept təhlükəsizliyini barmaq izi ilə artırır, sui-istifadənin qarşısını alır və bütün prosesləri rəqəmsallaşdırır.
            </motion.p>
            
            <motion.div variants={itemVariants} className="mt-8">
                <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4 text-center text-amber-900">
                        <p className="mb-2">
                           🎓 Layihə rəhbərinin təhsil öhdəlikləri səbəbindən BioScript komandası 2025-ci ilin avqustundan 2026-cı ilin avqustuna qədər müvəqqəti fasiləyə çıxır.
                        </p>
                        <p className="font-medium">
                           🙏 Göstərdiyiniz dəstək üçün təşəkkür edir, 2 avqust 2026-cı ildə yenidən sizinlə olmağı səbirsizliklə gözləyirik.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button asChild size="lg">
                <Link href="/request-demo">Demo Tələb Et</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/product">Məhsulumuz</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <img
              src="https://i.hizliresim.com/slj4kwk.png"
              alt="BioScript Platforması"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
