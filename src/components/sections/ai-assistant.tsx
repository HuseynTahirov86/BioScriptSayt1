'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Lightbulb, ShieldCheck } from 'lucide-react';

const benefits = [
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        title: 'Dəqiq Diaqnoz və Müalicə',
        description: 'AI, xəstənin bütün tibbi tarixçəsini analiz edərək ən uyğun dərmanları təklif edir və diaqnozun dəqiqliyini artırır.',
    },
    {
        icon: <Lightbulb className="h-8 w-8 text-primary" />,
        title: 'Ağıllı Tövsiyələr',
        description: 'Mövcud simptomlar və əvvəlki müalicələrə əsasən, süni zəka həkimə alternativ dərmanlar və dozalar barədə tövsiyələr verir.',
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: 'Səhvlərin Minimuma Endirilməsi',
        description: 'Dərmanların qarşılıqlı təsirini və pasiyentin allergiyalarını nəzərə alaraq, AI potensial riskləri və səhvləri əvvəlcədən müəyyən edir.',
    }
];


export function AiAssistant() {
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
      id="ai-assistant"
      className="border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div className="flex justify-center" variants={itemVariants}>
                <img
                src="https://i.hizliresim.com/79ulhgh.png"
                alt="BioScript ilə AI dəstəkli biometrik resept sistemi"
                width={500}
                height={500}
                className="rounded-lg shadow-xl object-cover aspect-square"
                data-ai-hint="AI healthcare"
                />
            </motion.div>
            <motion.div variants={itemVariants}>
                <div className="space-y-4">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Həkimlər üçün Süni Zəka Dəstəyi
                </h2>
                <p className="text-lg text-muted-foreground">
                    BioScript, resept yazma prosesini daha ağıllı və təhlükəsiz etmək üçün süni zəka gücündən istifadə edir. AI köməkçimiz, xəstənin bütün tibbi keçmişini analiz edərək həkimlərə ən optimal dərmanları tövsiyə edir.
                </p>
                </div>
                <div className="mt-8 space-y-6">
                    {benefits.map((benefit, index) => (
                        <motion.div key={index} className="flex items-start gap-4" variants={itemVariants}>
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                                <p className="mt-1 text-muted-foreground">{benefit.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
