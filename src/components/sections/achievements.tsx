'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy, Award, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const achievements = [
  {
    icon: <Trophy className="h-10 w-10 text-primary" />,
    title: 'InnoStart Hakatonu',
    description: 'SUP.VC və Rəqəmsal İnkişaf və Nəqliyyat Nazirliyinin təşkilatçılığı ilə keçirilən yarışmada 3-cü yer və inkubasiya proqramına qəbul.',
    source: 'SUP.VC & IRIA',
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: '3D Bacarıqlar: Mexatronika',
    description: 'Naxçıvan MR Təhsil Nazirliyinin STEAM Naxçıvan layihəsi çərçivəsində keçirilən yarışmada ("Ağıllı Aptek" adı ilə) 1-ci yer.',
    source: 'STEAM Naxçıvan',
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'Rəsmi Rəy',
    description: 'Layihənin praktiki tətbiqi və faydalarına dair Naxçıvan Dövlət Universitetinin Xəstəxanasından alınmış müsbət rəsmi rəy.',
    source: 'NDU Xəstəxanası',
  },
];

export function Achievements() {
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="achievements"
      className="border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Uğurlarımız və Nailiyyətlərimiz
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Layihəmizin qısa zamanda əldə etdiyi uğurlarla fəxr edirik.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
              className="h-full"
            >
              <Card className="glass-card flex h-full flex-col transition-all duration-300">
                <CardHeader className="items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    {item.icon}
                  </div>
                  <CardTitle className="mt-4">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <p className="p-4 text-center text-sm font-semibold text-primary">{item.source}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
