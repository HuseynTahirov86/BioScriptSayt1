
import type { BlogPost } from '@/lib/data';
import { BlogManagementClient } from './blog-management-client';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

async function getBlogData(): Promise<BlogPost[]> {
    try {
        const postsCollection = collection(db, 'blog');
        const q = query(postsCollection, orderBy('date', 'desc'));
        const postsSnapshot = await getDocs(q);
        return postsSnapshot.docs.map(doc => {
             const data = doc.data();
             // Convert Firestore Timestamp to a string date for the form
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
            console.error("Error fetching blog posts for admin:", error);
        }
        return [];
    }
}

export default async function BlogManagementPage() {
    const posts = await getBlogData();
    return <BlogManagementClient initialPosts={posts} />;
}
