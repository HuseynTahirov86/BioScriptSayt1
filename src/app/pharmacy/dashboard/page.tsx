'use client';

import { useState } from 'react';
import { Fingerprint, Loader2, Pill, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import type { Patient, Prescription } from '@/lib/types';
import { mockPatients, mockPrescriptions } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function PharmacyDashboardPage() {
  const { toast } = useToast();
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'found'>('idle');
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [patientPrescriptions, setPatientPrescriptions] = useState<Prescription[]>([]);

  const handleScan = () => {
    setScanState('scanning');
    setActivePatient(null);
    setPatientPrescriptions([]);
    setTimeout(() => {
      // Simulate finding a patient with prescriptions
      const patient = mockPatients[0];
      const prescriptions = mockPrescriptions.filter(
        (p) => p.patientId === patient.id
      );
      setActivePatient(patient);
      setPatientPrescriptions(prescriptions);
      setScanState('found');
      toast({ title: "Patient Found", description: `Prescriptions for ${patient.name} loaded.` });
    }, 1500);
  };
  
  const handleDispense = (prescriptionId: string) => {
    setPatientPrescriptions(prev =>
        prev.map(p => 
            p.id === prescriptionId ? { ...p, dispensed: true } : p
        )
    );
    toast({
        title: "Medication Dispensed",
        description: "The prescription status has been updated.",
        className: "bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200"
    });
  };

  const handleNewScan = () => {
    setScanState('idle');
    setActivePatient(null);
    setPatientPrescriptions([]);
  }

  const renderContent = () => {
    switch (scanState) {
      case 'scanning':
        return (
          <div className="text-center">
            <Loader2 className="h-16 w-16 animate-spin text-accent mx-auto" />
            <p className="mt-4 text-lg text-muted-foreground">Scanning fingerprint...</p>
          </div>
        );
      case 'found':
        if (activePatient) {
          return (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-2xl">Prescription Verification</CardTitle>
                    <CardDescription>Patient: <span className="font-bold text-foreground">{activePatient.name}</span></CardDescription>
                  </div>
                  <Button variant="outline" onClick={handleNewScan}>Scan New Patient</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Prescribing Doctor</TableHead>
                                <TableHead>Drug</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patientPrescriptions.map(p => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.date}</TableCell>
                                    <TableCell>{p.doctorName}</TableCell>
                                    <TableCell className="font-medium">{p.drugName}</TableCell>
                                    <TableCell>{p.dosage}</TableCell>
                                    <TableCell>
                                        <Badge variant={p.dispensed ? 'secondary' : 'default'} className={p.dispensed ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                                            {p.dispensed ? <CheckCircle className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                                            {p.dispensed ? 'Dispensed' : 'Active'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" onClick={() => handleDispense(p.id)} disabled={p.dispensed}>
                                            <Pill className="mr-2 h-4 w-4" />
                                            Dispense
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {patientPrescriptions.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No prescriptions found for this patient.</p>
                )}
              </CardContent>
            </Card>
          );
        }
        return null;
      case 'idle':
      default:
        return (
          <div className="text-center p-10 border-2 border-dashed rounded-lg">
            <h2 className="font-headline text-2xl mb-2">Verify Prescription</h2>
            <p className="text-muted-foreground mb-6">Scan patient's fingerprint to view and dispense their prescribed medication.</p>
            <Button size="lg" onClick={handleScan} variant="secondary" className="bg-accent/90 text-accent-foreground hover:bg-accent">
              <Fingerprint className="mr-2 h-6 w-6" /> Scan Patient Fingerprint
            </Button>
          </div>
        );
    }
  };
  
  return (
    <div className="w-full flex items-center justify-center">
      {renderContent()}
    </div>
  );
}
