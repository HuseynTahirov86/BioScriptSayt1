
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { az } from 'date-fns/locale';
import type { BlogPost } from '@/lib/data';
import type { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const postsCollection = collection(db, 'blog');
        const postsSnapshot = await getDocs(postsCollection);
        return postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as BlogPost));
    } catch (error) {
        if (error instanceof Error && error.message.toLowerCase().includes('permission-denied')) {
             console.error(`Firestore Permission Denied. Ensure Firestore API is enabled for project '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}'. Visit: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
        } else {
            console.error("Error fetching blog posts for slug page:", error);
        }
        return [];
    }
}

async function getPost(slug: string): Promise<BlogPost | undefined> {
    try {
        const postsCollection = collection(db, 'blog');
        const q = query(postsCollection, where("slug", "==", slug));
        const postSnapshot = await getDocs(q);

        if (postSnapshot.empty) {
            return undefined;
        }
        
        const postDoc = postSnapshot.docs[0];
        const postData = postDoc.data();

        // Ensure date is a string for format()
        if (postData.date && typeof postData.date.toDate === 'function') {
            postData.date = postData.date.toDate().toISOString().split('T')[0];
        }

        return { id: postDoc.id, ...postData } as BlogPost;

    } catch (error) {
        if (error instanceof Error && error.message.toLowerCase().includes('permission-denied')) {
             console.error(`Firestore Permission Denied. Ensure Firestore API is enabled for project '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}'. Visit: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
        } else {
            console.error(`Error fetching post by slug ${slug}:`, error);
        }
        return undefined;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Yazı Tapılmadı'
    }
  }

  const postUrl = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
        canonical: postUrl,
    },
    openGraph: {
        title: post.title,
        description: post.excerpt,
        url: postUrl,
        images: [
            {
                url: post.image,
                width: 1200,
                height: 630,
                alt: post.title,
            }
        ],
        type: 'article',
        publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.image],
    }
  }
}

export async function generateStaticParams() {
    try {
        const posts = await getBlogPosts();
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error("Error generating static params for blog:", error);
        return [];
    }
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bioscript.shop/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Organization',
      name: 'BioScript',
      url: 'https://bioscript.shop',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BioScript',
      logo: {
        '@type': 'ImageObject',
        url: 'https://old.bioscript.shop/wp-content/uploads/2025/03/cropped-BioScript-1-1536x614.png',
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-8 space-y-4 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.date), 'dd MMMM yyyy', { locale: az })}
            </p>
          </header>

          <img
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            className="mb-8 aspect-video w-full rounded-lg object-cover shadow-lg"
          />

          <div
            className="prose prose-lg mx-auto max-w-none prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
