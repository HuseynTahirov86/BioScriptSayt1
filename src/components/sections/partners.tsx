
import type { Partner } from '@/lib/data';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

async function getPartners(): Promise<Partner[]> {
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
            console.error("Error fetching partners for public page:", error);
        }
        return [];
    }
}

export async function Partners() {
  const partners = await getPartners();
  
  return (
    <section id="partners" className="border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Bizi Dəstəkləyənlər
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            İnnovativ missiyamızda bizə dəstək olan və inanan tərəfdaşlarımız.
          </p>
        </div>
        
        {partners.length > 0 && (
          <div className="mt-12 flex flex-col items-center space-y-12">
            <div
              className="flex min-h-[150px] flex-wrap items-center justify-center gap-x-12 gap-y-12 md:gap-x-16"
            >
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex w-60 flex-col items-center text-center"
                >
                  <div className="flex h-24 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} loqosu`}
                      className={cn(
                        "max-w-full object-contain max-h-24"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
