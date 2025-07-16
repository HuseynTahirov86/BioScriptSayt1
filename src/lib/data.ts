import type { Patient, Prescription } from './types';

export const mockPatients: Patient[] = [
  {
    id: 'p001',
    name: 'Jane Doe',
    dob: '1985-05-20',
    nationalId: '1234567890',
    fingerprintId: 'fp001',
    history: 'Hypertension, managed with Lisinopril. No known allergies.',
  },
  {
    id: 'p002',
    name: 'John Smith',
    dob: '1972-11-15',
    nationalId: '0987654321',
    fingerprintId: 'fp002',
    history: 'Type 2 Diabetes, controlled with Metformin. Allergic to penicillin.',
  },
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx001',
    patientId: 'p001',
    doctorId: 'd001',
    doctorName: 'Dr. Smith',
    drugName: 'Lisinopril',
    dosage: '10mg',
    duration: 'Once daily',
    date: '2023-10-28',
    dispensed: true,
  },
  {
    id: 'rx002',
    patientId: 'p002',
    doctorId: 'd001',
    doctorName: 'Dr. Smith',
    drugName: 'Metformin',
    dosage: '500mg',
    duration: 'Twice daily',
    date: '2023-11-01',
    dispensed: true,
  },
  {
    id: 'rx003',
    patientId: 'p001',
    doctorId: 'd001',
    doctorName: 'Dr. Smith',
    drugName: 'Amlodipine',
    dosage: '5mg',
    duration: 'Once daily',
    date: new Date().toISOString().split('T')[0],
    dispensed: false,
  },
];
