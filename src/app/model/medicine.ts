import { Patient } from "./patient";
export class Medicine {
  id: number = 0;
  name: string = '';
  dosage: string = '';
  expiryDate: string = '';
  manufacturer: string = '';
  type: string = '';
  patients: {
    patientId: number | null;
    name?: string;
  } = { patientId: null };
}

