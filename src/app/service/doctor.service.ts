import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../model/doctor';
import{ Patient}from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseUrl='http://localhost:8080/api/doctors';

  constructor(private http:HttpClient) { }

  getAllDr():Observable<Doctor[]>
  {
    return this.http.get<Doctor[]>(`${this.baseUrl}/getAllDoctors`);
  }

  getDrById(id:number):Observable<Doctor>
  {
    return this.http.get<Doctor>(`${this.baseUrl}/getDrById/${id}`)
  }

  saveDoctor(doctor:Doctor):Observable<Doctor>
  {
    return this.http.post<Doctor>(`${this.baseUrl}/saveDr`,doctor);
  }

  updateDr(id:number,doctor:Doctor):Observable<Doctor>
  {
    return this.http.put<Doctor>(`${this.baseUrl}/updateDr/${id}`,doctor)
  }

  deleteDr(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteDr/${id}`);
  }

  deletePatientById(id: number): Observable<Patient> {
  return this.http.delete<Patient>(`http://localhost:8080/api/patients/${id}`);

}

}
