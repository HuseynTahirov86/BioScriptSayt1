
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import type { TeamMember } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

async function getTeamMembers(): Promise<TeamMember[]> {
    try {
        const teamCollection = collection(db, 'team');
        const q = query(teamCollection, orderBy('order', 'asc'));
        const teamSnapshot = await getDocs(q);
        return teamSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as TeamMember));
    } catch (error) {
        if (error instanceof Error && error.message.toLowerCase().includes('permission-denied')) {
             console.error(`Firestore Permission Denied. Ensure Firestore API is enabled for project '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}'. Visit: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
        } else {
            console.error("Error fetching team members for public page:", error);
        }
        return [];
    }
}

export async function Team() {
  const teamMembers = await getTeamMembers();

  return (
    <section id="team" className="border-t bg-white">
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Peşəkar Komandamız
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Layihəmizin arxasında duran istedadlı və təcrübəli mütəxəssislər.
          </p>
        </div>
        
        {teamMembers.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="group w-full max-w-xs overflow-hidden text-center shadow-sm transition-shadow duration-300 hover:shadow-xl sm:w-auto sm:max-w-none sm:flex-1 sm:min-w-[250px] lg:max-w-xs">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                  <div className="mt-4 flex justify-center space-x-3">
                    {member.social.linkedin && member.social.linkedin !== '#' && (
                      <Link href={member.social.linkedin} className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    )}
                    {member.social.twitter && member.social.twitter !== '#' && (
                      <Link href={member.social.twitter} className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                    {member.social.instagram && member.social.instagram !== '#' && (
                      <Link href={member.social.instagram} className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5" />
                      </Link>
                    )}
                    {member.social.facebook && member.social.facebook !== '#' && (
                      <Link href={member.social.facebook} className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
