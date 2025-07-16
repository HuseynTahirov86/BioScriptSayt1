import Link from 'next/link';
import { Stethoscope, Pill, User, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="text-center mb-12">
        <Logo className="w-24 h-24 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">
          BioScript
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A secure, AI-enhanced biometric prescription system designed for modern healthcare professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl text-primary">Doctor Portal</CardTitle>
                <CardDescription>Login to manage patients and prescriptions.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Access patient records, create new prescriptions with AI assistance, and view patient history securely.</p>
            <Button asChild className="w-full font-bold group">
              <Link href="/doctor/login">
                Proceed to Doctor Login <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out border-2 border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Pill className="w-8 h-8 text-accent" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl text-accent">Pharmacy Portal</CardTitle>
                <CardDescription>Access to verify and dispense prescriptions.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Verify patient prescriptions using biometric data and manage medication dispensing efficiently.</p>
            <Button asChild variant="secondary" className="w-full font-bold group bg-accent/90 text-accent-foreground hover:bg-accent">
              <Link href="/pharmacy/login">
                Proceed to Pharmacy Login <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} BioScript. All rights reserved.</p>
        <p className="mt-1"> Revolutionizing Healthcare, One Prescription at a Time.</p>
      </footer>
    </main>
  );
}
