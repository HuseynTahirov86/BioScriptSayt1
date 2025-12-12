'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/form-actions';
import type { FormState } from '@/lib/data';
import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Göndərilir...
        </>
      ) : (
        'Göndər'
      )}
    </Button>
  );
}

export function Contact() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: FormState = { message: '', success: false };
  const [state, formAction] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Uğurlu!' : 'Xəta!',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

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
      id="contact"
      className="border-t bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Bizimlə Əlaqə
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizə yazın.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-2xl font-bold">Əlaqə Məlumatları</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-start">
                <MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>Naxçıvan şəhəri, Əziz Əliyev küçəsi, 4</span>
              </p>
              <p className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-primary" />
                <span>info@bioscript.shop</span>
              </p>
              <p className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                <span>+994 60 528 55 05</span>
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Mesaj Göndərin</CardTitle>
                <CardDescription>Komandamız qısa zamanda sizinlə əlaqə saxlayacaq.</CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={formRef} action={formAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Adınız</Label>
                    <Input id="contact-name" name="name" placeholder="Adınız" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">E-poçt</Label>
                    <Input id="contact-email" name="email" type="email" placeholder="E-poçt ünvanınız" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mesajınız</Label>
                    <Textarea id="message" name="message" placeholder="Mesajınızı buraya yazın..." required />
                  </div>
                  <SubmitButton />
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
