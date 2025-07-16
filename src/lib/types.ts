export interface Patient {
  id: string;
  name: string;
  dob: string;
  nationalId: string;
  fingerprintId: string;
  history: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  drugName: string;
  dosage: string;
  duration: string;
  date: string;
  dispensed: boolean;
}

export interface Doctor {
    id: string;
    name: string;
    username: string;
}
