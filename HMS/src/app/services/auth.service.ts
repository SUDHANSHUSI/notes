import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import{Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role:string=''
  constructor(private http:HttpClient,private route:Router) { }
 url=`http://localhost:5000/`
  register(data:any):Observable<any>{
  
    return this.http.post(`${this.url}register`,data);
  }

  login(data:any):Observable<any>{
    return this.http.post(`${this.url}login`,data);
  }

  appointment(data:any):Observable<any>{
    return this.http.post(`${this.url}appointment`,data);
  }

  userDetail():Observable<any>{
    return this.http.get(`${this.url}user`)
  }

  getAppointmentDetailForUser():Observable<any>{
    return this.http.get(`${this.url}appointment/user`)
  }


  getAllAppointment():Observable<any>{
    return this.http.get(`${this.url}appointment`)
  }

  isLoggedIn(){
    let token:string=localStorage.getItem('token');
    if(token){
      return token.startsWith('Bearer');
    }else{
      return false
    }
  }

  loggedOut(){
    localStorage.clear();
    this.route.navigate([''])
  }

  updateAppointment(id:string,data:any):Observable<any>{
    return this.http.patch(`${this.url}appointment/${id}`,data,{
      headers:new HttpHeaders({
        authorization:`${localStorage.getItem('token')}`
      })
    })
  }

  deleteAppointment(id:string):Observable<any>{
    return this.http.delete(`${this.url}appointment/${id}`,{
      headers:new HttpHeaders({
        authorization:`Bearer ${localStorage.getItem('token')}`
      })
    })
  }

}
