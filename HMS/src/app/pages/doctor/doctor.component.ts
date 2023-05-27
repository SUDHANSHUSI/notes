import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {

  doctor=[
    {doctor_name:'Walter White',role:['Chief Medical Officer'],description:'I have more than 10 year of experience And I am Chief Medical Officer',img:'assets/img/doctors/doctors-1.jpg',twitter:'',facebook:'',insta:'',linkedIn:''},
    {doctor_name:'Sarah Jhonson',role:['Anesthesiologist'],description:'I have more than 5 year of experience And I am Anesthesiologist',img:'assets/img/doctors/doctors-2.jpg',twitter:'',facebook:'',insta:'',linkedIn:''},
    {doctor_name:'William Anderson',role:['Cardiology'],description:'I have more than 7 year of experience And I am Cardiology',img:'assets/img/doctors/doctors-3.jpg',twitter:'',facebook:'',insta:'',linkedIn:''},
    {doctor_name:'Amanda Jepson',role:['Neurosurgeon'],description:'I have more than 3 year of experience And I am Neurosurgeon',img:'assets/img/doctors/doctors-4.jpg',twitter:'',facebook:'',insta:'',linkedIn:''},
  ]
}
