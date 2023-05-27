import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalAuthService {

  constructor(private http:HttpClient) { }
  url=`http://localhost:5000/`

  private _refresh=new Subject<void>();
  get refreshRequired(){
    return this._refresh;
  }

  doctorList():Observable<any>{
    return this.http.get(`${this.url}hospital/doctor`)
  }

  departmentList():Observable<any>{
    return this.http.get(`${this.url}department`);
  }

  getDepartment(id:string):Observable<any>{
    return this.http.get(`${this.url}department/${id}`);
  }

  createDepartment(data:any):Observable<any>{
    return this.http.post(`${this.url}department`,data);
  }

  createDoctor(departmentId:string,data:any):Observable<any>{
    return this.http.post(`${this.url}hospital/doctor/${departmentId}`,data).pipe(
      tap(()=>{
        this.refreshRequired.next();
      })
    );
  }

  getDoctorData(doctorId:string):Observable<any>{
    return this.http.get(`${this.url}hospital/doctor/${doctorId}`)
  }

  updateDoctorData(doctorId:string,data):Observable<any>{
    return this.http.post(`${this.url}hospital/doctor/${doctorId}`,data)
  }

  deleteDoctorData(doctorId:string):Observable<any>{
    return this.http.delete(`${this.url}hospital/doctor/${doctorId}`)
  }

  getDoctorByDepartment(departmentId:string):Observable<any>{
    return this.http.get(`${this.url}hospital/doctor/department/${departmentId}`)
  }
  
}
