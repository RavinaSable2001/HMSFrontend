import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../model/medicine';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  baseUrl='http://localhost:8080/api/medicine'
  constructor(private http:HttpClient) { }

  getAllMedicine():Observable<Medicine[]>
  {
    return this.http.get<Medicine[]>(`${this.baseUrl}/getAll`);
  }

  getDrById(id:number):Observable<Medicine>
  {
    return this.http.get<Medicine>(`${this.baseUrl}/getById/${id}`);
  }

  saveMedicine(medicine: Medicine, patientId: number): Observable<Medicine> {
    return this.http.post<Medicine>(`${this.baseUrl}/save/${patientId}`, medicine);
  }

  updateMedicine(id:number,medicine:Medicine):Observable<Medicine>
  {
    return this.http.put<Medicine>(`${this.baseUrl}/updateMedicine/${id}`,medicine);
  }

  deleteMedicine(id:number):Observable<Medicine>
  {
    return this.http.delete<Medicine>(`${this.baseUrl}/deleteMed/${id}`);
  }
}
