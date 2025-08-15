import { Component } from '@angular/core';
import { Medicine } from '../../../model/medicine';
import { Patient } from '../../../model/patient';
import { MedicineService } from '../../../service/medicine.service';
import { PatientService } from '../../../service/patient.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-medicine',
  standalone: false,
  templateUrl: './medicine.component.html',
  styleUrl: './medicine.component.css'
})
export class MedicineComponent  implements  OnInit{

 medicines: Medicine[] = [];
  medicine: Medicine = new Medicine();
  isEditing: boolean = false;
  patients: Patient[] = [];

  constructor(
    private medicineService: MedicineService,
    private patientService: PatientService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getAllMedicines();
    this.getAllPatients();
    // Ensure patient object exists
    this.medicine.patients = { patientId: null, name: '' };
  }

 getAllMedicines(): void {
  this.medicineService.getAllMedicine().subscribe(
    data => {
      console.log("Fetched medicines:", data); // 👈 log here
      this.medicines = data;
    },
    error => console.error('Error fetching medicines:', error)
  );
}

  getAllPatients(): void {
    this.patientService.getAllPatient().subscribe(
      data => this.patients = data,
      error => console.error('Error fetching patients:', error)
    );
  }

  goBack() {
  this.router.navigate(['/admin/dashboard']);
}


 saveMedicine(): void {
 if (!this.medicine.patients?.patientId) {
    alert('Please select a patient.');
    return;
  }

  this.medicineService.saveMedicine(this.medicine,  this.medicine.patients.patientId!).subscribe(
    () => {
      alert('Medicine saved successfully!');
      this.getAllMedicines();
      this.resetForm();
    },
    error => console.error('Error saving medicine:', error)
  );
}

  updateMedicine(): void {
    this.medicineService.updateMedicine(this.medicine.id, this.medicine).subscribe(
      () => {
        alert('Medicine updated successfully!');
        this.getAllMedicines();
        this.resetForm();
      },
      error => console.error('Error updating medicine:', error)
    );
  }

  saveOrUpdateMedicine(): void {
    // ensure patient object exists
    if (!this.medicine.patients) {
      this.medicine.patients = { patientId: null, name: '' };
    }
    this.isEditing ? this.updateMedicine() : this.saveMedicine();
  }

  editMedicine(med: Medicine): void {
    this.medicine = {
      ...med,
      expiryDate: med.expiryDate?.slice(0, 10), // ensures format yyyy-MM-dd
      patients: med.patients ?? { patientId: null, name: '' }
    };
    this.isEditing = true;
  }

  deleteMedicine(id: number): void {
    if (confirm('Are you sure you want to delete this medicine?')) {
      this.medicineService.deleteMedicine(id).subscribe(
        () => {
          alert('Medicine deleted successfully!');
          this.getAllMedicines();
        },
        error => console.error('Error deleting medicine:', error)
      );
    }
  }
setPatientId(patientId: number): void {
  if (!this.medicine.patients) {
    this.medicine.patients = { patientId: null, name: '' };
  }
  this.medicine.patients.patientId = patientId;
}
  resetForm(): void {
    this.medicine = new Medicine();
    this.medicine.patients = { patientId: null, name: '' }; // Ensure reset also initializes patient
    this.isEditing = false;
  }

}