import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Medicine } from '../../../model/medicine';
import { Patient } from '../../../model/patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-medicine',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './doctor-medicine.component.html',
  styleUrls: ['./doctor-medicine.component.css']
})
export class DoctorMedicineComponent   implements OnInit {


 medicines: Medicine[] = [];
  patients: Patient[] = [];
  medicine: Medicine = { id: 0, name: '', dosage: '', expiryDate: '', manufacturer: '', type: '', patients: { patientId: null } };
  isEditing: boolean = false;

  doctorId: number = Number(sessionStorage.getItem('doctorId')) || 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getPatientsByDoctor();
    this.getAllMedicines();
  }

  // Fetch only patients assigned to this doctor
  getPatientsByDoctor() {
    this.http.get<Patient[]>(`http://localhost:8080/api/patients/doctor/${this.doctorId}`)
      .subscribe({
        next: data => this.patients = data,
        error: err => console.error('Error fetching patients:', err)
      });
  }

  // Get all medicines
getAllMedicines() {
  this.http.get<Medicine[]>(`http://localhost:8080/api/medicine/doctor/${this.doctorId}`)
    .subscribe({
      next: data => this.medicines = data,
      error: err => console.error('Error fetching medicines:', err)
    });
}
  // Set selected patient ID when assigning
  setPatientId(id: number) {
    const selectedPatient = this.patients.find(p => p.patientId === +id);
    if (selectedPatient) {
      this.medicine.patients = { patientId: selectedPatient.patientId, name: selectedPatient.name };
    }
  }

  // Save or update medicine
  saveOrUpdateMedicine() {
    if (this.isEditing) {
      this.http.put<Medicine>(`http://localhost:8080/api/medicine/updateMedicine/${this.medicine.id}`, this.medicine)
        .subscribe({
          next: updated => {
            const index = this.medicines.findIndex(m => m.id === updated.id);
            this.medicines[index] = updated;
            this.resetForm();
          },
          error: err => console.error('Update failed:', err)
        });
    } else {
      const patientId = this.medicine.patients.patientId;
      if (!patientId) return alert('Please select a patient!');
      this.http.post<Medicine>(`http://localhost:8080/api/medicine/save/${patientId}`, this.medicine)
        .subscribe({
          next: created => {
            this.medicines.push(created);
            this.resetForm();
          },
          error: err => console.error('Save failed:', err)
        });
    }
  }

  // Edit medicine
  editMedicine(med: Medicine) {
    this.medicine = { ...med };
    this.isEditing = true;
  }

  // Delete medicine
  deleteMedicine(id: number) {
    if (confirm('Are you sure you want to delete this medicine?')) {
      this.http.delete(`http://localhost:8080/api/medicine/deleteMed/${id}`)
        .subscribe({
          next: () => this.medicines = this.medicines.filter(m => m.id !== id),
          error: err => console.error('Delete failed:', err)
        });
    }
  }

  // Reset form
  resetForm() {
    this.medicine = { id: 0, name: '', dosage: '', expiryDate: '', manufacturer: '', type: '', patients: { patientId: null } };
    this.isEditing = false;
  }

  // Back to dashboard
  goBack() {
    this.router.navigate(['/doctor/dashboard']);
  }
}