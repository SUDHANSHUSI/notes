import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HospitalAuthService } from 'src/app/services/hospital-auth.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private dailog: MatDialogRef<DepartmentFormComponent>,
    private auth:HospitalAuthService

  ) {}
  ngOnInit(): void {
    this.departmentForm = new FormGroup({
      departmentName: new FormControl('',Validators.required),
      shortDesc: new FormControl('', Validators.required),
      LongDesc: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.auth.createDepartment(this.departmentForm.value).subscribe((res)=>{
        this.toastr.success("Request send successfully...,contact admin to live departments.","Add Department")
      })
      this.dailog.close();
    } else {
      this.toastr.warning('Can not create Departments');
      this.dailog.close();
    }
  }
}
