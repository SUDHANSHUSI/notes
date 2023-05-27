import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HospitalAuthService } from 'src/app/services/hospital-auth.service';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit{

  doctorList:Doctor[]
  displayedColumns: string[] = ['Name', 'Email', 'Age', 'Gender','Experince','Department','isActive','action'];
  dataSource = new MatTableDataSource<Doctor>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private auth:HospitalAuthService,private dailog:MatDialog, private toastr:ToastrService){}

  ngOnInit(): void {
    this.doctorListData();
    this.auth.refreshRequired.subscribe((res)=>{
       return this.doctorListData();
    })
  }

  doctorListData(){
    this.auth.doctorList().subscribe((res)=>{
      this.doctorList=res.data;
      console.log(this.doctorList);
      
      this.dataSource=new MatTableDataSource<Doctor>(this.doctorList)
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;
    },(err)=>{
      console.log(err.message);
      
    })
  }

   
  updateDoctorData(id:string){
   this.openDialogForDoctor(id)
  }

  deleteDoctorData(id:string){
    if(confirm("Are you sure to delete the data.?")){
      this.auth.deleteDoctorData(id).subscribe((res)=>{
        this.toastr.success("Delete data successfully..","Delete request")
      })
      this.doctorListData();
    }
  }

  openDialogForDoctor(doctorId:string){
    this.dailog.open(DoctorFormComponent,{
      enterAnimationDuration:"500ms",
      exitAnimationDuration:'500ms',
      width:'40%',
      data:{doctorId}
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: number;
  age: number;
  experience: number;
  gender: string;
  isActive:boolean;
  departmentId: Department[];
  
}

export interface Department {
  _id: string;
  departmentName: string;
  includeDoctors: string[];
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];