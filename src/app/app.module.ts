import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorComponent } from './component/doctor/doctor.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './component/doctor-dashboard/doctor-dashboard.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { DoctorLoginComponent } from './component/doctor-login/doctor-login.component';
import { FormsModule } from '@angular/forms';
import { PatientsComponent } from './component/admin/patients/patients.component';
import { MedicineComponent as AdminMedicineComponent } from './component/admin/medicine/medicine.component';

import { AppointmentsComponent as AdminAppoinmentsComponent} from './component/admin/appointments/appointments.component';
import { AppointmentsComponent as DoctorAppoinmentsComponent} from './component/doctor/appointments/appointments.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DoctorPatientRecordsComponent } from './doctor-patient-records/doctor-patient-records.component';



@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent, 
    AdminDashboardComponent,
    DoctorDashboardComponent,
    AdminLoginComponent,
    DoctorLoginComponent,
    PatientsComponent,
    AdminMedicineComponent,
  
    HomeComponent,
    
 
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   FormsModule,
   AdminAppoinmentsComponent,
   DoctorAppoinmentsComponent,
    RouterModule, 
       DoctorPatientRecordsComponent,
   

  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
