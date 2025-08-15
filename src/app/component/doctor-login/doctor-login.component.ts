import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Doctor } from '../../model/doctor';

@Component({
  selector: 'app-doctor-login',
  standalone: false,
  templateUrl: './doctor-login.component.html',
styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
name: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  checkLogin(): void {
  // Trim whitespace from inputs
  const loginData = {
    name: this.name.trim(),
    password: this.password.trim()
  };

   this.http.post<Doctor>('http://localhost:8080/api/doctors/doctor/login', loginData)
      .subscribe({
        next: (doctor) => {
          // Save doctorId in sessionStorage for later use
          sessionStorage.setItem('doctorId', doctor.doctorId.toString());
          this.router.navigate(['/doctor/dashboard']);
        },
        error: () => {
          alert('Invalid Doctor credentials!');
        }
      });
  }
}