
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Blog } from '@/components/sections/blog';
import type { Metadata } from 'next';
import type { BlogPost } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const postsCollection = collection(db, 'blog');
        const q = query(postsCollection, orderBy('date', 'desc'));
        const postsSnapshot = await getDocs(q);
        
        return postsSnapshot.docs.map(doc => {
            const data = doc.data();
            // Ensure date is a string for client components
            if (data.date && typeof data.date.toDate === 'function') {
                data.date = data.date.toDate().toISOString().split('T')[0];
            }
            return {
                id: doc.id,
                ...data
            } as BlogPost
        });

    } catch (error) {
        if (error instanceof Error && error.message.toLowerCase().includes('permission-denied')) {
             console.error(`Firestore Permission Denied. Ensure Firestore API is enabled for project '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}'. Visit: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
        } else {
            console.error("Error fetching blog posts:", error);
        }
        return [];
    }
}

export const metadata: Metadata = {
  title: 'Blog',
  description: 'BioScript bloqunda səhiyyə texnologiyaları, biometrik təhlükəsizlik və rəqəmsal səhiyyə ilə bağlı ən son məqalələri və yenilikləri oxuyun.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
      images: ['https://i.hizliresim.com/slj4kwk.png'],
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Blog blogPosts={posts} />
      </main>
      <Footer />
    </div>
  );
}
