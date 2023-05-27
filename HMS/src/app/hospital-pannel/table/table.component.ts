import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import {MatDialog} from "@angular/material/dialog"
import { UpdatePopupComponent } from '../update-popup/update-popup.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['PatientName', 'Age', 'BloodGroup', 'Date','Department','DoctorName','Gender','Phone','AppointmentType','status','Action'];
  dataSource: MatTableDataSource<UserData>;
  allAppointment:UserData[]=[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private auth:AuthService , private dialog:MatDialog, private toastr:ToastrService) {
  
    this.dataSource = new MatTableDataSource<UserData>
  }
  ngOnInit(): void {
    this.getAllAppointment();
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllAppointment(){
    this.auth.getAllAppointment().subscribe((res)=>{
      this.allAppointment=res.appointment;
      this.dataSource=new MatTableDataSource<UserData>(this.allAppointment);
      console.log(this.allAppointment);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  updateData(id:string){
   const popup= this.dialog.open(UpdatePopupComponent,{
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      width:'30%',
      data:{
        id:id,
      }
    })

    popup.afterClosed().subscribe((res)=>{
      this.getAllAppointment();
    })
  }


  deleteData(id:string){
    if(confirm('Are you sure, you want to Delete data')){

      this.auth.deleteAppointment(id).subscribe((res)=>{
        console.log(res)
        this.toastr.success('Delete Appointment succcessfully','Delete Appointment ')
        this.getAllAppointment();
      })
    }else{
      this.getAllAppointment();
    }
  }
  
}

export interface UserData {
  fName:string;
  lName:string;
  age: number;
  bloodGroup: string;
  date: Date;
  department:string;
  doctorName:string;
  gender:string;
  phone:number;
  appointmentType:string;
  canActiveAppointment:boolean;
}

// function createNewUser(id: number): UserData {
//   const patientName =
//     this.allAppointment[Math.round(Math.random() * (fName.length - 1))] +
//     ' ' +
//     this.allAppointment[Math.round(Math.random() * (lName.length - 1))].charAt(0) +
//     '.';

//   return {
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }