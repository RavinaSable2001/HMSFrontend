import { Appointment } from "./appointment";
import { Doctor } from "./doctor";
import { Medicine } from "./medicine";

export class Patient {

patientId:number=0;
name:string='';
disease:string='';
contactNo:string=''

doctor:Doctor=new Doctor();
medicine:Medicine[]=[];
appoint:Appointment[]=[];


}
