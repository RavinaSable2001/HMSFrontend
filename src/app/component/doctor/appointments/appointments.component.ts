import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../../model/appointment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',

  templateUrl: './appointments.component.html',

  styleUrls: ['./appointments.component.css'],
    standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppointmentsComponent implements OnInit
 {
  appointments: Appointment[] = [];
  doctorId: number = Number(sessionStorage.getItem('doctorId')) || 0;
  loading: boolean = true;
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (this.doctorId) {
      this.getAppointmentsByDoctor();
    } else {
      alert('No doctor logged in!');
      this.loading = false;
    }
  }

  getAppointmentsByDoctor() {
    this.http.get<Appointment[]>(`http://localhost:8080/api/appoint/doctor/${this.doctorId}`)
      .subscribe({
        next: data => {
          this.appointments = data;
          this.loading = false;
        },
        error: err => {
          console.error('Error fetching appointments:', err);
          this.error = 'Failed to load appointments.';
          this.loading = false;
        }
      });
  }

  goBack() {
    this.router.navigate(['/doctor/dashboard']);
  }
}


