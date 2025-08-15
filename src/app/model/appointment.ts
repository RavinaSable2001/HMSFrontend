import { Doctor } from "./doctor";
import { Patient } from "./patient";

export class Appointment {
  id: number = 0;
  appointmentDate: string = '';  
  status: string = '';
  doctor: { doctorId: number; name?: string } = { doctorId: 0 };
  patient: { patientId: number; name?: string } = { patientId: 0 };
}

