import { Component ,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatAccordion} from '@angular/material/expansion';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { HospitalAuthService } from 'src/app/services/hospital-auth.service';
import { DepartmentFormComponent } from './department-form/department-form.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  
  step = -1;

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  
  displayedColumns = ['doctorName', 'gender', 'experience', 'phone'];
  departments:Department[]=[]
  doctor:Doctor[]=[]

  dataSource = new MatTableDataSource(this.doctor);

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private auth:HospitalAuthService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.allDepartmentDetail()
  }

  doctorData(id:string){
    this.auth.getDepartment(id).subscribe((res)=>{
      this.doctor=[]
      for(let doctor of res.data.includeDoctors){
        this.doctor.push(doctor)
      }
      this.dataSource = new MatTableDataSource(this.doctor);
    })
  }

  allDepartmentDetail(){
    this.auth.departmentList().subscribe((res)=>{
      this.departments=res.data;
      console.log(this.departments);
      
    })
  }

  openDialog(){
    this.dialog.open(DepartmentFormComponent,{
      enterAnimationDuration:'200ms',
      exitAnimationDuration:'200ms',
      width:'50%'
    })
  }
}

export interface Department {
  _id: string;
  departmentName: string;
  shortDesc:string;
  LongDesc:String;
  includeDoctors: string[];
  isActive:boolean
}

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: number;
  age: number;
  experience: number;
  gender: string;
  departmentId: Department[];
  __v: number;
}

