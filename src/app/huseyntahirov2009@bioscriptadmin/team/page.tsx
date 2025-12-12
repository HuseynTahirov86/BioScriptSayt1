
import type { TeamMember } from '@/lib/data';
import { TeamManagementClient } from './team-management-client';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

async function getTeamData(): Promise<TeamMember[]> {
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
            console.error("Error fetching team members:", error);
        }
        return [];
    }
}

export default async function TeamManagementPage() {
    const teamMembers = await getTeamData();
    return <TeamManagementClient initialMembers={teamMembers} />;
}
