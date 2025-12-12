'use client';

import { motion } from 'framer-motion';

export function About() {
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
      id="about"
      className="border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div className="order-last lg:order-first" variants={itemVariants}>
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                BioScript Nədir?
              </h2>
              <p className="text-muted-foreground">
                BioScript — səhiyyə sahəsində istifadəyə yönəlmiş biometrik resept və elektron identifikasiya sistemidir. Layihə həkimlərin elektron reseptləri təhlükəsiz şəkildə yazmasını, pasiyentlərin isə apteklərdən yalnız özlərinə aid reseptlər üzrə dərmanları əldə etməsini təmin edir.
              </p>
              <p className="text-muted-foreground">
                Sistemimiz, barmaq izi texnologiyası ilə resept saxtakarlığının və dərman sui-istifadəsinin qarşısını alır, kağız sənədləşməni aradan qaldırır və bütün prosesi rəqəmsallaşdıraraq səhiyyə xidmətlərini daha müasir və səmərəli edir.
              </p>
            </div>
          </motion.div>
          <motion.div className="overflow-hidden rounded-lg shadow-xl" variants={itemVariants}>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/D44fbcx6uQA"
                title="BioScript Tanıtım Videosu"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
