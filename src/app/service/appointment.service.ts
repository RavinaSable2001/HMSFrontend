import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

   baseUrl='http://localhost:8080/api/appoint';

  constructor(private http:HttpClient) { }

  getAllAppoin():Observable<Appointment[]>
  {
    return this.http.get<Appointment[]>(`${this.baseUrl}/getAll`);
  }
  getById(id:number):Observable<Appointment>
  {
    return this.http.get<Appointment>(`${this.baseUrl}/getById/${id}`);
  }

 saveAppoin(appoint: any): Observable<Appointment> {
  return this.http.post<Appointment>(`${this.baseUrl}/saveAppoin`, appoint);
}

  updateAppoint(id:number,appoin: Appointment):Observable<Appointment>
  {
    return this.http.put<Appointment>(`${this.baseUrl}/updateAppoin/${id}`,appoin);
  }


  deleteAppoin(id:number):Observable< Appointment>
  {
    return this.http.delete< Appointment>(`${this.baseUrl}/deleteAppoin/${id}`);
  }
}
