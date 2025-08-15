import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
 styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private router:Router){}

  goToDoctors(){
    this.router.navigate(['/admin/doctors']);
  }

  goToPatient(){
    this.router.navigate(['/admin/patients']);
  }

  goToMedicine()
  {
    this.router.navigate(['admin/medicines']);
  }

  goToAppointments()
  {
    this.router.navigate(['admin/appointments']);
  }

  logOut()
  {
    sessionStorage.clear();
    this.router.navigate(['/admin/login']);
  }

  
}
