import { Appointment } from "./appointment";
import { Patient } from "./patient";

export class Doctor {
  doctorId: number = 0;
  name: string = '';
  contactno: string = '';
  specialization: string = '';
  password: string = '';

 patients:Patient[]=[];
 appoin:Appointment[]=[];
}
