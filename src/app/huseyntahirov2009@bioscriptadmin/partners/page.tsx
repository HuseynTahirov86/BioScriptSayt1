
import type { Partner } from '@/lib/data';
import { PartnersManagementClient } from './partners-management-client';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

async function getPartnersData(): Promise<Partner[]> {
    try {
        const partnersCollection = collection(db, 'partners');
        const q = query(partnersCollection, orderBy('order', 'asc'));
        const partnersSnapshot = await getDocs(q);
        return partnersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Partner));
    } catch (error) {
        if (error instanceof Error && error.message.toLowerCase().includes('permission-denied')) {
             console.error(`Firestore Permission Denied. Ensure Firestore API is enabled for project '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}'. Visit: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
        } else {
            console.error("Error fetching partners:", error);
        }
        return [];
    }
}

export default async function PartnersManagementPage() {
    const partners = await getPartnersData();
    return <PartnersManagementClient initialPartners={partners} />;
}
