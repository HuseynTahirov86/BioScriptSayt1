
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RequestsClient } from './requests-client';
import type { ContactSubmission, DemoRequest } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

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


async function getSubmissionsData() {
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
        if (error instanceof Error && error.message.toLowerCase().includes('permission-denied')) {
             console.error(`Firestore Permission Denied. Ensure Firestore API is enabled for project '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}'. Visit: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
        } else {
            console.error("Error fetching submissions:", error);
        }
        return { contactSubmissions: [], demoRequests: [] };
    }
}

export default async function RequestsManagementPage() {
  const { contactSubmissions, demoRequests } = await getSubmissionsData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Müraciətlərin İdarəetməsi</h1>
        <p className="text-muted-foreground">
          Buradan əlaqə və demo müraciətlərinə baxa bilərsiniz.
        </p>
      </div>

      <Tabs defaultValue="demo">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="demo">Demo Tələbləri ({demoRequests.length})</TabsTrigger>
          <TabsTrigger value="contact">Əlaqə Mesajları ({contactSubmissions.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="demo">
           <RequestsClient type="demo" initialData={demoRequests} />
        </TabsContent>
        <TabsContent value="contact">
            <RequestsClient type="contact" initialData={contactSubmissions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
