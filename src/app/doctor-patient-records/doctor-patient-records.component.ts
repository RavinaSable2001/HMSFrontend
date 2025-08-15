import { Component, OnInit } from '@angular/core';

import { Patient } from '../model/patient';  // your class Patient
import { CommonModule } from '@angular/common'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-patient-records',
  standalone: true,       // <-- this makes it standalone
 imports: [CommonModule, HttpClientModule], 
  templateUrl: './doctor-patient-records.component.html',
  styleUrls: ['./doctor-patient-records.component.css']
})
export class DoctorPatientRecordsComponent  implements OnInit {
 patients: Patient[] = [];
  loading: boolean = true;
  error: string = '';

  // Get logged-in doctor ID from session storage
  doctorId: number = Number(sessionStorage.getItem('doctorId')) || 0;

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    if (this.doctorId) {
      this.getPatientsByDoctor();
    } else {
      alert('No doctor logged in!');
      this.loading = false;
    }
  }

  goBack() {
  this.router.navigate(['/doctor/dashboard']);
}

  getPatientsByDoctor(): void {
    this.http.get<Patient[]>(`http://localhost:8080/api/patients/doctor/${this.doctorId}`)
      .subscribe({
        next: (data) => {
          // Map backend doctor data to existing doctor object safely
          this.patients = data.map(p => {
            if (p.doctor) {
              p.doctor = { ...p.doctor }; // overwrite initialized Doctor with backend data
            }
            return p;
          });
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching patients:', err);
          this.error = 'Failed to load patients.';
          this.loading = false;
        }
      });
  }
}