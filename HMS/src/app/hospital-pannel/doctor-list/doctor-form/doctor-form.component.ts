import { Component, OnInit ,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HospitalAuthService } from 'src/app/services/hospital-auth.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css'],
})
export class DoctorFormComponent implements OnInit {
  doctorForm: FormGroup;
  isUpdate:boolean=false;
  
  department: DepartmentDetail[];
  constructor(
    private toastr: ToastrService,
    private auth: HospitalAuthService,
    private dailog: MatDialogRef<DoctorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}

  ngOnInit(): void {
    this.doctorForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      gender: new FormControl('male', Validators.required),
      isActive: new FormControl(false),
      
    });

    this.departmentList();
    let id=this.data.doctorId;
    if(id!=null && id!=''){
      this.loadDoctorData(id);
    }
  }

  departmentList() {
    this.auth.departmentList().subscribe((res) => {
      this.department = res.data;
      // console.log(this.department);
    });
  }

  doctorData :any;
  updateValue:any;

  loadDoctorData(doctorId:string){
    this.isUpdate=true;
    this.auth.getDoctorData(doctorId).subscribe((res)=>{
      this.doctorData=res.data
      console.log(this.doctorData);
      
      this.doctorForm.setValue({
       name:this.doctorData.name,
       email:this.doctorData.email,
       phone:this.doctorData.phone,
       age:this.doctorData.age,
       department:this.doctorData.departmentId,
       experience:this.doctorData.experience,
       gender:this.doctorData.gender,
       isActive:false,
      })
    })
  }

  onSubmit() {
    if (this.doctorForm.valid) {

      if(this.isUpdate==false){
        this.auth
          .createDoctor(this.doctorForm.value.department, this.doctorForm.value)
          .subscribe((res) => {
            this.toastr.success(
              'Your request send successfully.reach admin to live doctor..',
              'Doctor Registration'
            );
            this.dailog.close();
          });
      }else{
        this.updateValue={
          name:this.doctorForm.value.name,
          email:this.doctorForm.value.email,
          phone:this.doctorForm.value.phone,
          age:this.doctorForm.value.age,
          experience:this.doctorForm.value.experience,
          gender:this.doctorForm.value.gender,
         
        }
        this.auth.updateDoctorData(this.doctorData._id,this.updateValue).subscribe((res)=>{
          this.toastr.success(
            'Update data successfully..',
            'update detail'
          );
          this.dailog.close();
          this.isUpdate=false;
        })
      }
    } else {
      this.toastr.warning(
        'Enter valid data. And try again..',
        'Doctor Registration'
      );
    }
  }
}

interface DepartmentDetail {
  _id: string;
  departmentName: string;
}
