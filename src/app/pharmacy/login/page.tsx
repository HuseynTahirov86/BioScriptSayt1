'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { Fingerprint } from 'lucide-react';

export default function PharmacyLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    toast({
      title: 'Authentication Successful',
      description: 'Redirecting to Pharmacy dashboard...',
    });
    router.push('/pharmacy/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4 text-center shadow-2xl">
        <CardHeader>
           <Link href="/" className="inline-block mx-auto">
            <Logo className="w-16 h-16 text-accent" />
          </Link>
          <CardTitle className="font-headline text-3xl text-accent">Pharmacy Portal</CardTitle>
          <CardDescription>Verify your identity to access the system.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-6">
                Please use the biometric scanner to log in securely. This ensures that only authorized personnel can access prescription data.
            </p>
          <Button onClick={handleLogin} variant="secondary" className="w-full h-24 font-bold text-lg bg-accent/90 text-accent-foreground hover:bg-accent group">
            <Fingerprint className="mr-4 h-10 w-10 transition-transform group-hover:scale-110" />
            Scan ID & Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
