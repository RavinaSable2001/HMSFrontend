import { Component } from '@angular/core';
import { PatientService } from '../../../service/patient.service';
import { Patient } from '../../../model/patient';
import { Doctor } from '../../../model/doctor';
import { DoctorService } from '../../../service/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: false,
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {

   
  patients:Patient[] = [];
  patient: Patient = new Patient();
  isEditing: boolean = false;
  doctors: Doctor[] = []; 

  constructor(private patientService:PatientService,private doctorservice:DoctorService,private router:Router) {}

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllDoctors(); // Optional if assigning doctors
  }

  getAllPatients(): void {
    this.patientService.getAllPatient().subscribe(
      data => {
        this.patients = data;
      },
      error => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  getAllDoctors(): void {
 
    this.doctorservice.getAllDr().subscribe(
       data => {
      this.doctors = data;
    },
    error => {
      console.error('Error fetching doctors', error);
    }
  );
}
    
  
  savePatient(): void {
    this.patientService.savePatient(this.patient).subscribe(
      data => {
        alert('Patient saved successfully!');
        this.getAllPatients();
        this.resetForm();
      },
      error => {
        console.error('Error saving patient:', error);
      }
    );
  }

  updatePatient(): void {
    this.patientService.updatePatient(this.patient.patientId, this.patient).subscribe(
      data => {
        alert('Patient updated successfully!');
        this.getAllPatients();
        this.resetForm();
      },
      error => {
        console.error('Error updating patient:', error);
      }
    );
  }

  saveOrUpdatePatient(): void {
    if (this.isEditing) {
      this.updatePatient();
    } else {
      this.savePatient();
    }
  }

  goBack() {
  this.router.navigate(['/admin/dashboard']);
}


  editPatient(p: Patient): void {
    this.patient = { ...p }; // clone object
    this.isEditing = true;
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe(
        data => {
          alert('Patient deleted successfully!');
          this.getAllPatients();
        },
        error => {
          console.error('Error deleting patient:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.patient = new Patient();
    this.isEditing = false;
  }

}
