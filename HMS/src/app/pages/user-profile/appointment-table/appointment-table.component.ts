import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


// import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css'],
})
export class AppointmentTableComponent implements AfterViewInit, OnInit {
  public dataSource!: MatTableDataSource<appointmentType>;
  public appointments: appointmentType[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'position',
    'name',
    'age',
    'gender',
    'department',
    'doctor',
    'date',
    'status'
  ];

  constructor(private auth: AuthService) {}

  ngAfterViewInit() {
    
  }
  ngOnInit(): void {
    this.getAppointmentDetailForUser();
  }
  

  getAppointmentDetailForUser() {
    this.auth.getAppointmentDetailForUser().subscribe((res) => {
      this.appointments = res;
      this.dataSource = new MatTableDataSource<appointmentType>(this.appointments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.appointments);
      
    });
  }
}
export interface appointmentType {
  position: number;
  name: string;
  age: number;
  gender: string;
  department: string;
  doctor: string;
  date: Date;
}
