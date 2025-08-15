import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './component/doctor-dashboard/doctor-dashboard.component';
import { MedicineComponent as AdminMedicineComponent } from './component/admin/medicine/medicine.component'; // ✅ Import added
import { DoctorComponent } from './component/doctor/doctor.component';
import { DoctorPatientRecordsComponent } from './doctor-patient-records/doctor-patient-records.component';
import { DoctorLoginComponent } from './component/doctor-login/doctor-login.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { PatientsComponent } from './component/admin/patients/patients.component';

import { AppointmentsComponent as AdminAppoinmentsComponent } from './component/admin/appointments/appointments.component';
import { HomeComponent } from './component/home/home.component';
import { DoctorMedicineComponent } from './component/doctor/doctor-medicine/doctor-medicine.component';

import { AppointmentsComponent as DoctorAppoinmentsComponent } from './component/doctor/appointments/appointments.component';
const routes: Routes = [
  {
     path: 'doctor/dashboard', component:DoctorDashboardComponent
  },

  { path: 'doctor/medicine', component: DoctorMedicineComponent },

  {
    path:'home',component:HomeComponent
  },

  {
    path:'doctor/patients',component:DoctorPatientRecordsComponent

  },
{ path:'admin/appointments',component:AdminAppoinmentsComponent},

{path:'doctor/appointments',component:DoctorAppoinmentsComponent},

  {
path:'doctor/medicine',component:DoctorMedicineComponent
  },

   { path: 'admin/medicines', component: AdminMedicineComponent }, 

  {
    path:'doctor/login',component:DoctorLoginComponent
  },
  {
    path:'admin/doctors',component:DoctorComponent
  },
  {
    path:'admin/patients',component:PatientsComponent
  },
  {
    path:'admin/dashboard',component:AdminDashboardComponent
  },

 {
    path:'admin/login',component:AdminLoginComponent
  },
  { path: '', redirectTo: 'doctor', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
