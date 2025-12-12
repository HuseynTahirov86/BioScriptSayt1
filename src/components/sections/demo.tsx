'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { submitDemoRequest } from '@/app/form-actions';
import type { FormState } from '@/lib/data';
import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
       {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Göndərilir...
        </>
      ) : (
        'Demo Tələbini Göndər'
      )}
    </Button>
  );
}

export function Demo() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: FormState = { message: '', success: false };
  const [state, formAction] = useActionState(submitDemoRequest, initialState);

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

  return (
    <motion.section
      id="demo"
      className="border-t bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl font-bold sm:text-4xl">
                Platformanı Kəşf Edin
              </CardTitle>
              <CardDescription>
                BioScript-in fəaliyyətinizə necə fayda verə biləcəyini görmək üçün fərdi demo tələb edin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad və Soyad</Label>
                    <Input id="name" name="name" placeholder="Adınız və Soyadınız" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Şirkət/Klinika Adı</Label>
                    <Input id="company" name="company" placeholder="Təşkilatınızın adı" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-poçt</Label>
                  <Input id="email" name="email" type="email" placeholder="is_epochtunuz@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon Nömrəsi</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+994 (XX) XXX XX XX" />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
