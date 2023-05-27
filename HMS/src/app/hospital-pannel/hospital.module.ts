import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalPannelComponent } from './hospital-pannel.component';
import { HospitalRoutingModule } from './hospital-routing.module';
import { MaterialModule } from 'src/material.module';
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { UpdatePopupComponent } from './update-popup/update-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DepartmentListComponent } from './main/department-list/department-list.component';
import { DepartmentFormComponent } from './main/department-list/department-form/department-form.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { DoctorFormComponent } from './doctor-list/doctor-form/doctor-form.component';

@NgModule({
  declarations: [
    HospitalPannelComponent,
    MainComponent,
    TableComponent,
    UpdatePopupComponent,
    DoctorListComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    DoctorFormComponent,
  ],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    
    
  ],
  exports: [HospitalPannelComponent, MainComponent, RouterModule],
})
export class HospitalModule {}
