'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Fingerprint, ShieldCheck, FileX2, Accessibility, History, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const advantages = [
  {
    icon: <Fingerprint className="h-8 w-8 text-primary" />,
    title: 'Yüksək Biometrik Təhlükəsizlik',
    description: 'Reseptlər yalnız sahibinin barmaq izi ilə əldə edilə bilər. Login və şifrə oğurluğu riski yoxdur.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Sui-istifadəyə Qarşı Mübarizə',
    description: 'Psixotrop və nəzarət olunan dərmanların qanunsuz dövriyyəsinin və sui-istifadəsinin qarşısını alır.',
  },
  {
    icon: <FileX2 className="h-8 w-8 text-primary" />,
    title: 'Kağızsız Səhiyyə',
    description: 'Kağız reseptləri, arxivləşdirmə və sənəd itkisi problemlərini tamamilə aradan qaldırır.',
  },
  {
    icon: <Accessibility className="h-8 w-8 text-primary" />,
    title: 'Hər Kəs Üçün Əlçatanlıq',
    description: 'Yaşlılar və texnologiyadan uzaq insanlar üçün şifrə tələb etmədən, sadəcə bir toxunuşla istifadə imkanı.',
  },
   {
    icon: <History className="h-8 w-8 text-primary" />,
    title: 'Sürətli Tibbi Tarixçə',
    description: 'Həkimlər pasiyentin əvvəlki reseptlərinə və müalicə məlumatlarına saniyələr içində çıxış əldə edir.',
  },
  {
    icon: <BadgeCheck className="h-8 w-8 text-primary" />,
    title: 'Səhvlərin Azaldılması',
    description: 'Rəqəmsal sistem resept yazılışında və dərman təqdimatında insani səhvləri minimuma endirir.',
  },
];

export function Advantages() {
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
    <motion.section
      id="advantages"
      className="border-t bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            BioScript-in Əsas Üstünlükləri
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Sistemimiz mövcud həllərdən daha təhlükəsiz, daha rahat və daha səmərəlidir.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
            >
              <Card className="h-full shadow-sm transition-shadow hover:shadow-xl">
                <CardHeader className="items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {advantage.icon}
                  </div>
                  <CardTitle>{advantage.title}</CardTitle>
                  <CardDescription className="mt-2">{advantage.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
