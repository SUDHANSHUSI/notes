import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router:Router
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('',[ Validators.required,Validators.email]),
    password: new FormControl('', Validators.required),
  });
  onSubmit() {
    
    console.log(this.loginForm);
    
    
    const data = this.loginForm.value;
    this.auth.login(data).subscribe(
      (data) => {
        console.log(data);
        if (data.success) {
          
          console.log('role :'+data.role);
          this.toastr.success('logIn successfully....');
          if(data.role=='hospital'){
            this.auth.role='hospital'
            let token:string=`Bearer ${data.token}`
            localStorage.setItem('token', token);
            this.router.navigate(['/hospital/main']);
          }
          else {
             this.auth.role='user'
             console.log( this.auth.role);
             let token:string=`Bearer ${data.token}`
             localStorage.setItem('token', token);
             this.router.navigate(['/appointment']);
          }
        } else {
          this.toastr.warning(data.message);
        }
      },
      (e) => {
        this.toastr.warning(e.error.message);
      }
    );
  }
}
