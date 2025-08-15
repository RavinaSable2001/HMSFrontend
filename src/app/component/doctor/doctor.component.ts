import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../model/doctor';
import { DoctorService } from '../../service/doctor.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  standalone: false,
  templateUrl: './doctor.component.html',
   styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit

{

  doctors:Doctor[]=[]; //get All Doctors
  doctor:Doctor=new Doctor();
  isEditing:boolean=false;

  constructor(private doctorService:DoctorService,private router:Router){}

  ngOnInit(): void {
      
    this.getAlldr();//Load All Doctors
  }

  getAlldr():void{

    this.doctorService.getAllDr().subscribe(data=>{
      this.doctors=data;

    },error=>{
      console.error('error getting doctor',error);
    }

    );
  }

 onTestClick(): void {
  document.body.innerHTML += '<p style="color:red;">Clicked!</p>';
}


  saveDoctor(): void {
  console.log('Sending doctor to save:', this.doctor); 

  this.doctorService.saveDoctor(this.doctor).subscribe(
    data => {
      console.log('Doctor saved successfully:', data); 
      alert('Doctor Added Successfully.......');
      this.getAlldr();
      this.resetForm();
    },
    error => {
      console.error('Error adding doctor', error);
    }
  );
}


  //load dr
  editDr(d:Doctor):void{
     this.doctor = { ...d }; // clone object to avoid direct reference
    this.isEditing = true;
  }

  updateDoctor():void{
    this.doctorService.updateDr(this.doctor.doctorId,this.doctor).subscribe(data=>{
      alert('Doctor update Successfully..');
      this.getAlldr();
      this.resetForm();


    },error=>{
    console.error('Error updating doctor', error);
    }
  );
  }

  goBack() {
  this.router.navigate(['/admin/dashboard']);
}

deleteDr(id: number): void {
  if (confirm('Are you sure you want to delete this doctor?')) {
    this.doctorService.deleteDr(id).subscribe(
      data => {
        console.log('Delete response:', data);
        alert('✅ Doctor deleted successfully!');
        this.getAlldr();
      },
      error => {
        console.error('❌ Error deleting doctor:', error);
        alert('❌ Failed to delete doctor!');
      }
    );
  }
}
  resetForm(): void {
    this.doctor = new Doctor();
    this.isEditing = false;
  }
}
