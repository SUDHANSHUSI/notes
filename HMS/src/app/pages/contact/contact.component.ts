import { Component } from '@angular/core';
import { FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private toastr:ToastrService,private router:Router) {}

  contactForm=new FormGroup({
    name:new FormControl('',Validators.required),
    subject:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required, Validators.email]),
    message:new FormControl('',Validators.required),
  })

  query(){
    console.log(this.contactForm)
    if (this.contactForm.valid) {
      // this.service.RegisterUser(this.registrationForm.value).subscribe(result => {
      // });
      this.toastr.success('Your responce submitted successfully..')
      // this.router.navigate(['login'])
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
