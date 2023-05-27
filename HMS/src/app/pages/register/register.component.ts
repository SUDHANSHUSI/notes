import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { phoneValidator } from '../../shared/phoneValidation';
import { AuthService } from '../../services/auth.service';
import { matchPasswordValidator } from 'src/app/shared/confirmPasswird';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService
  ) {}
  hide = true;
  hide1 = true;
  ngOnInit(): void {}

  registrationForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNum: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]*$/),
      ]),
      address: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      gender: new FormControl('male'),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])\S{8,}$/
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [
      matchPasswordValidator('password', 'confirmPassword'),
      phoneValidator('phoneNum'),
    ]
  );

  getControl(name: any): AbstractControl | null {
    return this.registrationForm.get(name);
  }

  proceedregister() {
    const data = this.registrationForm.value;
    if (!this.registrationForm.valid) {
      this.toastr.warning('Enter Valid Data...');
      return;
    }
    this.auth.register(data).subscribe(
      (data) => {
        this.toastr.success('Registration successfully.');
        console.log(data);
        this.registrationForm.reset();
      },
      (err) => {
        this.toastr.warning(err.error.message);
      }
    );
  }

  toLogin() {
    this.router.navigate(['login']);
  }
}
