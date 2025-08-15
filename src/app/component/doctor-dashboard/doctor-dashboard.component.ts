import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: false,
  templateUrl: './doctor-dashboard.component.html',
styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {

constructor(private router:Router){}

  goToPatients() {
  this.router.navigate(['/doctor/patients']);
}

goToMedicines() {
  this.router.navigate(['/doctor/medicine']);
}

goToAppointments() {
  this.router.navigate(['/doctor/appointments']);
}

  logOut() {
   
    sessionStorage.clear(); 
    this.router.navigate(['doctor/login']); 
  }

}
