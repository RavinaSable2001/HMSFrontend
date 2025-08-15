import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../../model/appointment';
import { Doctor } from '../../../model/doctor';
import { Patient } from '../../../model/patient';
import { AppointmentService } from '../../../service/appointment.service';
import { DoctorService } from '../../../service/doctor.service';
import { PatientService } from '../../../service/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  appointment: Appointment = new Appointment();
  isEditMode: boolean = false;

  doctors: Doctor[] = [];
  patients: Patient[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAppointments();
    this.getAllDoctors();
    this.getAllPatients();
  }

  getAllAppointments(): void {
    this.appointmentService.getAllAppoin().subscribe({
      next: data => {
        console.log('Appointments fetched:', data);
        this.appointments = data;
      },
      error: err => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  getAllDoctors(): void {
    this.doctorService.getAllDr().subscribe(data => {
      this.doctors = data;
    });
  }

  getAllPatients(): void {
    this.patientService.getAllPatient().subscribe(data => {
      this.patients = data;
    });
  }

  saveAppointment(): void {
  console.log('Original object:', this.appointment); // 🔍 Debug

  const payload = {
    appointmentDate: this.appointment.appointmentDate,
    status: this.appointment.status,
    doctor: { doctorId: this.appointment.doctor?.doctorId },
    patient: { patientId: this.appointment.patient?.patientId }
  };

  console.log("Clean payload to send:", payload); // ✅ MUST look clean

  this.appointmentService.saveAppoin(payload).subscribe({
    next: () => {
      alert("✅ Appointment Saved Successfully!");
      this.getAllAppointments();
      this.resetForm();
    },
    error: (error) => {
      console.error('❌ Error saving appointment:', error);
      alert("❌ Failed to save appointment. Check console.");
    }
  });
}

editAppointment(app: Appointment): void {
  this.appointment = JSON.parse(JSON.stringify(app));
  this.appointment.appointmentDate = this.formatDateToInput(app.appointmentDate);
  this.isEditMode = true;
}
  deleteAppointment(id: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppoin(id).subscribe(() => {
        this.getAllAppointments();
      });
    }
  }

  resetForm(): void {
    this.appointment = new Appointment();
    this.isEditMode = false;
  }

 formatDateToInput(date: string | Date): string {
  const d = new Date(date);  // works for both string and Date
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}


goBack() {
  this.router.navigate(['/admin/dashboard']);
}

}
