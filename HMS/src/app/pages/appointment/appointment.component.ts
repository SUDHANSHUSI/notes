import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HospitalAuthService } from 'src/app/services/hospital-auth.service';
// import { DatepickerAdapterComponent } from '../datepicker-adapter/datepicker-adapter.component';
// import { DatepickerAdapterComponent } from '../datepicker-adapter/datepicker-adapter.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],

  // imports:[DatepickerAdapterComponent]
})
export class AppointmentComponent {
  registerForm: any = FormGroup;
  submitted = false;
  bloodGroupType = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  appointmentType = [
    'Regular Checkup',
    'Follow-up Visit',
    'Telephone Consultations',
  ];
  getDepartment=[];
  getDoctorForDepartment=[];
  
  minDate:string
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private hospitalAuth:HospitalAuthService
  ) { const currentDate = new Date();
    this.minDate = currentDate.toISOString().split('T')[0];}

  ngOnInit() {
    //Add form validations
    this.registerForm = this.formBuilder.group({
      fName: this.formBuilder.control('', [Validators.required]),
      lName: this.formBuilder.control('', [Validators.required]),
      age: this.formBuilder.control('', [Validators.required]),
      bloodGroup: this.formBuilder.control('A+'),
      gender: this.formBuilder.control('male', [Validators.required]),
      phone: this.formBuilder.control('', [Validators.required]),
      date: this.formBuilder.control('', [Validators.required]),
      department: this.formBuilder.control(''),
      doctorName: this.formBuilder.control(''),
      appointmentType: this.formBuilder.control(''),
      canActiveAppointment: this.formBuilder.control(true),
    });

    // All Department List
    this.hospitalAuth.departmentList().subscribe((res)=>{    
      let data=res.data
      data.forEach(element => {
        this.getDepartment.push({name:element.departmentName,id:element._id})
      });
      // console.log(this.getDepartment);
      
    })

  }
  //Add user form actions
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      this.auth.appointment(this.registerForm.value).subscribe(
        (res) => {
          if (this.registerForm.valid) {
            this.toastr.success(
              'Your appointment booked.We will callback you before appointment.ThankYou.'
            );
            this.registerForm.reset();
            this.route.navigate(['/userProfile']);
          } else {
            this.toastr.error('Please enter valid data.');
          }
        },
        (err) => {
          this.toastr.error(err.error.message);
        }
      );
    } else {
      this.toastr.error('Please enter Valid data...');
    }
  }

  getValue(event) {
    this.getDoctorForDepartment=[]
    // console.log(event.target?.value);
    this.hospitalAuth.getDoctorByDepartment(event.target?.value).subscribe((res)=>{
      console.log(res.data);
      const data=res.data
      data.forEach(doctor => {
        this.getDoctorForDepartment.push(doctor.name)
      });
    })
  }
}
