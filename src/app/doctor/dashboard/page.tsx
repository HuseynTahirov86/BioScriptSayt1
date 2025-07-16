'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Fingerprint, Loader2, User, UserPlus, FilePlus, History, ClipboardList } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import type { Patient, Prescription } from '@/lib/types';
import { mockPatients, mockPrescriptions } from '@/lib/data';
import { AIAssistant } from './ai-assistant';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// #region Components

const patientRegistrationSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  dob: z.string().min(1, 'Date of birth is required.'),
  nationalId: z.string().min(1, 'National ID is required.'),
  history: z.string().min(10, 'Patient history is required (min 10 characters).'),
});

function PatientRegistrationForm({ onRegister }: { onRegister: (patient: Patient) => void }) {
  const form = useForm<z.infer<typeof patientRegistrationSchema>>({
    resolver: zodResolver(patientRegistrationSchema),
    defaultValues: { name: '', dob: '', nationalId: '', history: '' },
  });

  function onSubmit(values: z.infer<typeof patientRegistrationSchema>) {
    const newPatient: Patient = {
      ...values,
      id: `p${Date.now()}`,
      fingerprintId: `fp${Date.now()}`,
    };
    onRegister(newPatient);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><UserPlus /> New Patient Registration</CardTitle>
        <CardDescription>Patient not found in database. Please register them.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="dob" render={({ field }) => (
                <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="nationalId" render={({ field }) => (
              <FormItem><FormLabel>National ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="history" render={({ field }) => (
              <FormItem><FormLabel>Medical History</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit">Register Patient</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

const prescriptionFormSchema = z.object({
  drugName: z.string().min(1, "Drug name is required."),
  dosage: z.string().min(1, "Dosage is required."),
  duration: z.string().min(1, "Duration is required."),
});

function PatientView({ patient, prescriptions, onNewPrescription }: { patient: Patient; prescriptions: Prescription[]; onNewPrescription: (p: Prescription) => void }) {
  const form = useForm<z.infer<typeof prescriptionFormSchema>>({
    resolver: zodResolver(prescriptionFormSchema),
    defaultValues: { drugName: '', dosage: '', duration: '' },
  });

  function onSubmit(values: z.infer<typeof prescriptionFormSchema>) {
    const newPrescription: Prescription = {
      ...values,
      id: `rx${Date.now()}`,
      patientId: patient.id,
      doctorId: 'd001',
      doctorName: 'Dr. Smith',
      date: new Date().toISOString().split('T')[0],
      dispensed: false,
    };
    onNewPrescription(newPrescription);
    form.reset();
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><User /> Patient Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><p className="font-semibold">Name</p><p>{patient.name}</p></div>
          <div><p className="font-semibold">Date of Birth</p><p>{patient.dob}</p></div>
          <div><p className="font-semibold">National ID</p><p>{patient.nationalId}</p></div>
          <div><p className="font-semibold">Fingerprint ID</p><p>{patient.fingerprintId}</p></div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><FilePlus /> New Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="drugName" render={({ field }) => (
                    <FormItem><FormLabel>Drug Name</FormLabel><FormControl><Input placeholder="e.g., Amoxicillin" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="dosage" render={({ field }) => (
                    <FormItem><FormLabel>Dosage</FormLabel><FormControl><Input placeholder="e.g., 500mg" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="duration" render={({ field }) => (
                    <FormItem><FormLabel>Duration / Frequency</FormLabel><FormControl><Input placeholder="e.g., Twice daily for 7 days" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit">Add Prescription</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><History /> Prescription History</CardTitle>
            </CardHeader>
            <CardContent>
              {prescriptions.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Drug</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prescriptions.map(p => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.date}</TableCell>
                                    <TableCell className="font-medium">{p.drugName}</TableCell>
                                    <TableCell>
                                        <Badge variant={p.dispensed ? 'secondary' : 'default'}>{p.dispensed ? 'Dispensed' : 'Active'}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              ) : <p className="text-muted-foreground">No past prescriptions found.</p>}
            </CardContent>
          </Card>
        </div>
        <AIAssistant patient={patient} />
      </div>
    </div>
  );
}

// #endregion

export default function DoctorDashboardPage() {
  const { toast } = useToast();
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'notFound' | 'found'>('idle');
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [allPrescriptions, setAllPrescriptions] = useState<Prescription[]>(mockPrescriptions);

  const handleScan = () => {
    setScanState('scanning');
    setActivePatient(null);
    setTimeout(() => {
      // Simulate finding a patient (50% chance)
      if (Math.random() > 0.5) {
        const patient = mockPatients[0];
        setActivePatient(patient);
        setScanState('found');
        toast({ title: "Patient Found", description: `Details for ${patient.name} loaded.` });
      } else {
        setScanState('notFound');
        toast({ variant: 'destructive', title: "Patient Not Found", description: "Please register the new patient." });
      }
    }, 1500);
  };

  const handleRegister = (patient: Patient) => {
    // In a real app, you'd save this to the DB. Here we just set as active.
    setActivePatient(patient);
    setScanState('found');
    toast({ title: "Registration Successful", description: `Patient ${patient.name} has been registered.` });
  };
  
  const handleNewPrescription = (prescription: Prescription) => {
    setAllPrescriptions(prev => [prescription, ...prev]);
    toast({ title: "Prescription Added", description: `${prescription.drugName} has been prescribed.` });
  };
  
  const handleNewScan = () => {
    setActivePatient(null);
    setScanState('idle');
  };

  const renderContent = () => {
    switch (scanState) {
      case 'scanning':
        return (
          <div className="text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-lg text-muted-foreground">Scanning fingerprint...</p>
          </div>
        );
      case 'notFound':
        return <PatientRegistrationForm onRegister={handleRegister} />;
      case 'found':
        if (activePatient) {
          const patientPrescriptions = allPrescriptions
            .filter(p => p.patientId === activePatient.id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return <PatientView patient={activePatient} prescriptions={patientPrescriptions} onNewPrescription={handleNewPrescription} />;
        }
        return null;
      case 'idle':
      default:
        return (
          <div className="text-center">
            <h2 className="font-headline text-2xl mb-2">Patient Lookup</h2>
            <p className="text-muted-foreground mb-6">Start by scanning the patient's fingerprint to retrieve their records.</p>
            <Button size="lg" onClick={handleScan}>
              <Fingerprint className="mr-2 h-6 w-6" /> Scan Patient Fingerprint
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {scanState === 'found' && (
         <div className="mb-6 flex justify-end">
           <Button variant="outline" onClick={handleNewScan}>Scan New Patient</Button>
         </div>
      )}
      <div className="flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}
