
'use server';

import { bioscriptChatbot } from '@/ai/flows/bioscript-chatbot';
import { generateBlogPost } from '@/ai/flows/blog-generator';
import { generateImage } from '@/ai/flows/image-generator';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/utils';
import type { ContactSubmission, DemoRequest, BlogPost, Partner, TeamMember, FormState } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where, writeBatch, limit } from 'firebase/firestore';
import { initialTeamMembers, initialPartners } from '@/lib/seed-data';


// Helper to convert Firestore Timestamps to JSON-serializable format (Dates)
const fromFirestore = <T>(docSnap: any): T => {
    const data = docSnap.data();
    for (const key in data) {
        if (data[key] && typeof data[key].toDate === 'function') {
            data[key] = data[key].toDate();
        }
    }
    return { id: docSnap.id, ...data } as T;
};


const ChatSchema = z.object({
  query: z.string().min(1, 'Sorğu boş ola bilməz'),
});

export async function askBioScriptChatbot(formData: FormData) {
  const validatedFields = ChatSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return { error: 'Sorğu etibarlı deyil.' };
  }

  try {
    const result = await bioscriptChatbot(validatedFields.data);
    return { response: result.response };
  } catch (error) {
    console.error('Chatbot error:', error);
    return { error: 'Gözlənilməz xəta baş verdi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.' };
  }
}

const GenerateBlogSchema = z.object({
  topic: z.string().min(3, 'Mövzu ən azı 3 hərfdən ibarət olmalıdır.'),
});

export async function generateBlogPostAction(formData: FormData) {
  const validatedFields = GenerateBlogSchema.safeParse({
    topic: formData.get('topic'),
  });

  if (!validatedFields.success) {
    return { error: 'Mövzu etibarlı deyil.' };
  }

  try {
    const [blogResult, imageResult] = await Promise.all([
      generateBlogPost(validatedFields.data),
      generateImage({ prompt: validatedFields.data.topic }),
    ]);

    return {
      data: {
        ...blogResult,
        image: imageResult.imageUrl,
      },
    };
  } catch (error) {
    console.error('Blog/Image generation error:', error);
    return { error: 'AI tərəfindən məzmun yaradılarkən xəta baş verdi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.' };
  }
}

const blogPostFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Başlıq boş ola bilməz'),
  excerpt: z.string().min(1, 'Qısa məzmun boş ola bilməz'),
  content: z.string().min(1, 'Tam mətn boş ola bilməz'),
  date: z.string().min(1, 'Tarix boş ola bilməz'),
  image: z.string().url('Etibarlı şəkil URL daxil edin').or(z.literal('')),
});

export async function saveBlogPostAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = blogPostFormSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return { 
            success: false,
            message: "Məlumatlar etibarlı deyil. Zəhmət olmasa, xətaları düzəldin.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    try {
      const { id, ...data } = validatedFields.data;
      const postData = {
          ...data,
          slug: slugify(data.title),
          image: data.image || 'https://placehold.co/800x450.png',
          aiHint: 'blog abstract'
      };
      
      if (id) {
          const postRef = doc(db, 'blog', id);
          await updateDoc(postRef, postData);
          revalidatePath(`/blog/${postData.slug}`);
      } else {
          await addDoc(collection(db, 'blog'), postData);
          revalidatePath(`/blog/${postData.slug}`);
      }

      revalidatePath('/blog');
      revalidatePath('/huseyntahirov2009@bioscriptadmin/blog');
      
      return { success: true, message: id ? 'Yazı uğurla yeniləndi.' : 'Yazı uğurla əlavə edildi.' };

    } catch (error) {
        console.error("Blog save error:", error);
        return { success: false, message: 'Yazı yadda saxlanılarkən xəta baş verdi.' };
    }
}


export async function deleteBlogPostAction(id: string) {
    try {
        if (!id) throw new Error("ID is required for deletion.");
        await deleteDoc(doc(db, "blog", id));

        revalidatePath('/blog');
        revalidatePath('/huseyntahirov2009@bioscriptadmin/blog');

        return { success: true };
    } catch (error) {
        console.error("Blog delete error:", error);
        return { success: false, error: 'Yazı silinərkən xəta baş verdi.' };
    }
}

export async function deleteContactSubmission(id: string) {
    try {
        await deleteDoc(doc(db, "contact-submissions", id));
        revalidatePath('/huseyntahirov2009@bioscriptadmin/requests');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete contact submission:", error);
        return { success: false, error: "Mesaj silinərkən xəta baş verdi." }
    }
}

export async function deleteDemoRequest(id: string) {
    try {
        await deleteDoc(doc(db, "demo-requests", id));
        revalidatePath('/huseyntahirov2009@bioscriptadmin/requests');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete demo request:", error);
        return { success: false, error: "Demo tələbi silinərkən xəta baş verdi." }
    }
}

const teamMemberFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Ad boş ola bilməz."),
    role: z.string().min(1, "Vəzifə boş ola bilməz."),
    image: z.string().url("Etibarlı şəkil URL daxil edin.").or(z.literal('')),
    order: z.string().transform(val => Number(val) || 0),
    'social.linkedin': z.string().optional(),
    'social.twitter': z.string().optional(),
    'social.instagram': z.string().optional(),
    'social.facebook': z.string().optional(),
});

export async function saveTeamMemberAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = teamMemberFormSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return { 
            success: false,
            message: "Məlumatlar etibarlı deyil.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    try {
        const { id, name, role, image, order } = validatedFields.data;
        const social = {
            linkedin: validatedFields.data['social.linkedin'] || '',
            twitter: validatedFields.data['social.twitter'] || '',
            instagram: validatedFields.data['social.instagram'] || '',
            facebook: validatedFields.data['social.facebook'] || '',
        };

        let finalOrder = order;
        if (!id) { // Only calculate next order for new members
            const teamCollection = collection(db, "team");
            const q = query(teamCollection, orderBy("order", "desc"), limit(1));
            const querySnapshot = await getDocs(q);
            const lastOrder = querySnapshot.empty ? 0 : querySnapshot.docs[0].data().order;
            finalOrder = lastOrder + 1;
        }

        const memberData = {
            name,
            role,
            image: image || 'https://placehold.co/250x250.png',
            social,
            aiHint: 'person portrait',
            order: finalOrder,
        };
        
        if (id) {
            await updateDoc(doc(db, "team", id), memberData);
        } else {
            await addDoc(collection(db, "team"), memberData);
        }

        revalidatePath('/about');
        revalidatePath('/huseyntahirov2009@bioscriptadmin/team');
        
        return { success: true, message: id ? 'Üzv uğurla yeniləndi.' : 'Üzv uğurla əlavə edildi.' };

    } catch (error) {
        console.error("Team member save error:", error);
        return { success: false, message: 'Komanda üzvü yadda saxlanılarkən xəta baş verdi.' };
    }
}

export async function deleteTeamMemberAction(id: string) {
    try {
        await deleteDoc(doc(db, "team", id));
        revalidatePath('/about');
        revalidatePath('/huseyntahirov2009@bioscriptadmin/team');
        return { success: true };
    } catch (error) {
        console.error("Team member delete error:", error);
        return { success: false, error: "Komanda üzvü silinərkən xəta baş verdi." };
    }
}

const partnerFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Ad boş ola bilməz."),
    logo: z.string().url("Etibarlı loqo URL daxil edin.").or(z.literal('')),
    order: z.string().transform(val => Number(val) || 0),
});

export async function savePartnerAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = partnerFormSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return { 
            success: false,
            message: "Məlumatlar etibarlı deyil.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const { id, name, logo, order } = validatedFields.data;
        
        let finalOrder = order;
        if (!id) { // Only calculate next order for new partners
            const partnersCollection = collection(db, "partners");
            const q = query(partnersCollection, orderBy("order", "desc"), limit(1));
            const querySnapshot = await getDocs(q);
            const lastOrder = querySnapshot.empty ? 0 : querySnapshot.docs[0].data().order;
            finalOrder = lastOrder + 1;
        }
        
        const partnerData = {
            name,
            logo: logo || 'https://placehold.co/150x60.png',
            aiHint: 'company logo',
            order: finalOrder,
        };
        
        if (id) {
            await updateDoc(doc(db, "partners", id), partnerData);
        } else {
            await addDoc(collection(db, "partners"), partnerData);
        }

        revalidatePath('/');
        revalidatePath('/huseyntahirov2009@bioscriptadmin/partners');
        
        return { success: true, message: id ? 'Dəstəkçi uğurla yeniləndi.' : 'Dəstəkçi uğurla əlavə edildi.' };
    } catch (error) {
        console.error("Partner save error:", error);
        return { success: false, message: 'Dəstəkçi yadda saxlanılarkən xəta baş verdi.' };
    }
}

export async function deletePartnerAction(id: string) {
    try {
        await deleteDoc(doc(db, "partners", id));
        revalidatePath('/');
        revalidatePath('/huseyntahirov2009@bioscriptadmin/partners');
        return { success: true };
    } catch (error) {
        console.error("Partner delete error:", error);
        return { success: false, error: "Dəstəkçi silinərkən xəta baş verdi." };
    }
}


const LoginSchema = z.object({
  email: z.string().email({ message: 'Etibarlı e-poçt ünvanı daxil edin.' }),
  password: z.string().min(1, { message: 'Parol boş ola bilməz.' }),
});

export async function login(prevState: { error: string } | undefined, formData: FormData) {
    const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return { error: 'Məlumatlar etibarlı deyil.' };
    }

    const { email, password } = validatedFields.data;

    // Hardcoded credentials for prototype
    if (email !== 'huseyntahirov@bioscript.shop' || password !== 'Huseyntahirov2009@') {
        return { error: 'E-poçt və ya parol yanlışdır.' };
    }
    
    cookies().set('auth_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    });
    
    redirect('/huseyntahirov2009@bioscriptadmin');
}

export async function logout() {
    cookies().delete('auth_session');
    redirect('/huseyntahirov2009@bioscriptadmin/login');
}

export async function getSubmissionsDataAction() {
  try {
    const contactQuery = query(collection(db, 'contact-submissions'), orderBy('submittedAt', 'desc'));
    const demoQuery = query(collection(db, 'demo-requests'), orderBy('requestedAt', 'desc'));

    const [contactSnapshot, demoSnapshot] = await Promise.all([
        getDocs(contactQuery),
        getDocs(demoQuery)
    ]);
    
    const contactSubmissions = contactSnapshot.docs.map(doc => fromFirestore<ContactSubmission>(doc));
    const demoRequests = demoSnapshot.docs.map(doc => fromFirestore<DemoRequest>(doc));
    
    return { contactSubmissions, demoRequests };
  } catch (error) {
    console.error('Failed to get submissions data:', error);
    return { contactSubmissions: [], demoRequests: [] };
  }
}

export async function seedDatabaseAction() {
    try {
        const teamCollection = collection(db, "team");
        const partnersCollection = collection(db, "partners");

        const teamSnapshot = await getDocs(teamCollection);
        if (teamSnapshot.empty) {
            const batch = writeBatch(db);
            initialTeamMembers.forEach(member => {
                const docRef = doc(collection(db, "team"));
                batch.set(docRef, member);
            });
            await batch.commit();
        }

        const partnersSnapshot = await getDocs(partnersCollection);
        if (partnersSnapshot.empty) {
             const batch = writeBatch(db);
             initialPartners.forEach(partner => {
                const docRef = doc(collection(db, "partners"));
                batch.set(docRef, partner);
            });
            await batch.commit();
        }
        
        revalidatePath('/about');
        revalidatePath('/huseyntahirov2009@bioscriptadmin/team');
        revalidatePath('/');
        revalidatePath('/huseyntahirov2009@bioscriptadmin/partners');

        return { success: true, message: "Başlanğıc məlumatlar uğurla yükləndi!" };
    } catch (error) {
        console.error("Database seeding error:", error);
        return { success: false, message: "Məlumatlar yüklənərkən xəta baş verdi." };
    }
}
