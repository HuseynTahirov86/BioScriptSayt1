import { MetadataRoute } from 'next'
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/lib/data';

const BASE_URL = 'https://bioscript.shop';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    
    // Static Pages
    const staticRoutes = [
        '',
        '/about',
        '/product',
        '/pricing',
        '/blog',
        '/contact',
        '/request-demo',
        '/privacy-policy'
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));


    // Dynamic Blog Pages
    let blogPosts: MetadataRoute.Sitemap = [];
    try {
        const postsCollection = collection(db, 'blog');
        const q = query(postsCollection, orderBy('date', 'desc'));
        const postsSnapshot = await getDocs(q);
        
        blogPosts = postsSnapshot.docs.map(doc => {
            const data = doc.data() as BlogPost;
            let lastModified = new Date(); // Default to now
            if (data.date) {
                const dateObj = (data.date as any).toDate ? (data.date as any).toDate() : new Date(data.date);
                if (!isNaN(dateObj.getTime())) {
                    lastModified = dateObj;
                }
            }
            return {
                url: `${BASE_URL}/blog/${data.slug}`,
                lastModified: lastModified.toISOString(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }
        });
    } catch (error) {
        console.error("Failed to generate sitemap for blog posts:", error);
    }
    

    return [...staticRoutes, ...blogPosts];
}
