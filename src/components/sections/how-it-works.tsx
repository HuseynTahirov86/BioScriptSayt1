'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Fingerprint, PenSquare, Hospital, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Stethoscope className="h-8 w-8 text-primary" />,
    title: '1. Həkim Sistemə Daxil Olur',
    description: 'Həkim öz istifadəçi adı və parolu ilə təhlükəsiz şəkildə BioScript platformasına daxil olur.',
  },
  {
    icon: <Fingerprint className="h-8 w-8 text-primary" />,
    title: '2. Pasiyent İdentifikasiya Olunur',
    description: 'Pasiyent barmaq izi skaneri ilə identifikasiya edilir. Yeni pasiyentlər üçün ilkin qeydiyyat aparılır.',
  },
  {
    icon: <PenSquare className="h-8 w-8 text-primary" />,
    title: '3. Resept Yazılır',
    description: 'Həkim pasiyentin təsdiqlənmiş profilinə rəqəmsal resept yazır və bu, birbaşa mərkəzi bazada saxlanılır.',
  },
  {
    icon: <Hospital className="h-8 w-8 text-primary" />,
    title: '4. Dərmanlar Aptekdən Alınır',
    description: 'Pasiyent istənilən aptekdə barmaq izini skan edərək yalnız özünə aid reseptləri aktivləşdirir və dərmanları alır.',
  },
];

export function HowItWorks() {
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="how-it-works"
      className="border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            İş Prinsipi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            BioScript sistemi 4 sadə addımda təhlükəsiz və sürətli xidmət təmin edir.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
            >
              <Card className="h-full text-center shadow-sm transition-shadow duration-300 hover:shadow-xl glass-card">
                <CardHeader className="items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {step.icon}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription className="mt-2 text-foreground/80">{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
