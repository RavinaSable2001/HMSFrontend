import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl='http://localhost:8080/api/patients'
  constructor(private http:HttpClient) { }

  getAllPatient():Observable<Patient[]>
  {
    return this.http.get<Patient[]>(`${this.baseUrl}/getAllPatients`);
  }

  getById(id:number):Observable<Patient>
  {
    return this.http.get<Patient>(`${this.baseUrl}/getById/${id}`);
  }

  savePatient(patient:Patient):Observable<Patient>
  {
    return this.http.post<Patient>(`${this.baseUrl}/savePatients`,patient);
  }

  updatePatient(id:number,patient:Patient):Observable<Patient>
  {
    return this.http.put<Patient>(`${this.baseUrl}/updatePatients/${id}`,patient)
  }

  deletePatient(id:number):Observable<Patient>
  {
    return this.http.delete<Patient>(`${this.baseUrl}/deletePatient/${id}`)
  }
}
