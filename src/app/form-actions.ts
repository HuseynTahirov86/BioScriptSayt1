'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import type { FormState } from '@/lib/data';
import { headers } from 'next/headers';

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Ad ən azı 2 hərfdən ibarət olmalıdır.' }),
  email: z.string().email({ message: 'Etibarlı e-poçt ünvanı daxil edin.' }),
  message: z.string().min(10, { message: 'Mesaj ən azı 10 simvoldan ibarət olmalıdır.' }),
});

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = ContactFormSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Məlumatlar etibarlı deyil.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const ipAddress = headers().get('x-forwarded-for') ?? headers().get('x-real-ip') ?? null;
    const newSubmission = {
      ...validatedFields.data,
      submittedAt: new Date(),
      ipAddress: ipAddress,
    };
    await addDoc(collection(db, "contact-submissions"), newSubmission);

    revalidatePath('/huseyntahirov2009@bioscriptadmin/requests');
    revalidatePath('/huseyntahirov2009@bioscriptadmin');

    return { success: true, message: 'Mesajınız uğurla göndərildi!' };
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    let message = 'Mesajınız yadda saxlanılarkən xəta baş verdi.';
    if (error instanceof Error && error.message.includes('PERMISSION_DENIED')) {
        message = 'Server xətası: Verilənlər bazasına yazmaq üçün icazə yoxdur. Zəhmət olmasa, Firebase Firestore qaydalarını yoxlayın.';
    }
    return { success: false, message };
  }
}

const DemoRequestSchema = z.object({
  name: z.string().min(2, { message: 'Ad və soyad ən azı 2 hərfdən ibarət olmalıdır.' }),
  company: z.string().min(2, { message: 'Şirkət adı ən azı 2 hərfdən ibarət olmalıdır.' }),
  email: z.string().email({ message: 'Etibarlı e-poçt ünvanı daxil edin.' }),
  phone: z.string().optional(),
});

export async function submitDemoRequest(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = DemoRequestSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Məlumatlar etibarlı deyil.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const ipAddress = headers().get('x-forwarded-for') ?? headers().get('x-real-ip') ?? null;
    const newRequest = {
        ...validatedFields.data,
        requestedAt: new Date(),
        ipAddress: ipAddress,
    };
    await addDoc(collection(db, "demo-requests"), newRequest);

    revalidatePath('/huseyntahirov2009@bioscriptadmin/requests');
    revalidatePath('/huseyntahirov2009@bioscriptadmin');

    return { success: true, message: 'Demo tələbiniz uğurla qeydə alındı!' };
  } catch (error) {
     console.error("Failed to save demo request:", error);
    let message = 'Demo tələbi yadda saxlanılarkən xəta baş verdi.';
    if (error instanceof Error && error.message.includes('PERMISSION_DENIED')) {
        message = 'Server xətası: Verilənlər bazasına yazmaq üçün icazə yoxdur. Zəhmət olmasa, Firebase Firestore qaydalarını yoxlayın.';
    }
    return { success: false, message };
  }
}
