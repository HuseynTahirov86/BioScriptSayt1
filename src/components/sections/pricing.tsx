'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    name: '🏥 Xəstəxana Paketi',
    initialPayment: 'İlkin Ödəniş: 50 USD (bir həkim üçün lisenziya)',
    monthlyPayment: 'Aylıq Ödəniş: 20 USD / həkim',
    features: [
      'Biometrik E-resept sistemi',
      'Həkim paneli (giriş, resept yazma, xəstə qeydiyyatı)',
      'Pasiyent tarixçəsi görüntüləmə',
      'Admin panel (xəstəxana üzrə izləmə)',
      'Analitika və hesabatlar',
    ],
    buttonText: 'Seçmək',
    href: '/request-demo?plan=hospital',
    popular: true,
  },
  {
    name: '🏪 Aptek Paketi',
    initialPayment: 'İlkin Ödəniş: 50 USD',
    monthlyPayment: 'Aylıq Ödəniş: Satılan dərmanların 3%-i',
    features: [
      'Resept doğrulama və qeydiyyat',
      'Çevik resept idarəsi',
      'Satış tarixçəsi və hesabatlar',
      'Aptek admin paneli (filial qeydiyyatı və izləmə)',
    ],
    buttonText: 'Seçmək',
    popular: true,
    href: '/request-demo?plan=pharmacy'
  },
  {
    name: 'Korporativ',
    initialPayment: 'Böyük xəstəxanalar və səhiyyə şəbəkələri üçün fərdi həllər.',
    monthlyPayment: '',
    features: [
      'Limitsiz həkim və aptek filialı',
      'Bütün paketlərin xüsusiyyətləri',
      'Fərdi inteqrasiyalar (API)',
      'Genişləndirilmiş analitika',
      'Xüsusi dəstək meneceri',
    ],
    buttonText: 'Əlaqə Saxlayın',
    href: '/contact',
    popular: false,
  },
];

export function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="pricing"
      className="border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto space-y-12 px-4 py-12 md:py-24 lg:py-32 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            💊 BioScript Paketləri
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Fəaliyyətinizə uyğun paketi seçin və səhiyyədə rəqəmsal transformasiyaya bu gündən başlayın.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
              className="h-full"
            >
              <Card className={`glass-card flex h-full flex-col transition-all duration-300 ${tier.popular ? 'border-primary' : ''}`}>
                {tier.popular && (
                  <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-1 rounded-t-lg">Populyar</div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription className="text-foreground/80">{tier.initialPayment}</CardDescription>
                  {tier.monthlyPayment && (
                    <div className="flex items-baseline">
                      <p className="text-xl font-bold">{tier.monthlyPayment}</p>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <h4 className="font-semibold mb-2">Təklif edilən funksiyalar:</h4>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                    <Link href={tier.href}>{tier.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
         <motion.div className="mt-10 text-center text-sm text-muted-foreground" variants={itemVariants}>
          <p><strong>Qeyd:</strong> Bütün paketlərə ilkin texniki qurulum və tələb olunan biometrik avadanlıqlar (barmaq izi skanerləri) daxildir. Fərdi təkliflər üçün bizimlə əlaqə saxlayın.</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
