import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalPannelComponent } from './hospital-pannel.component';
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DepartmentListComponent } from './main/department-list/department-list.component';

const hospitalRoutes: Routes = [
  {
    path: '',
    component: HospitalPannelComponent,
    children: [
      { path: 'main', component: MainComponent, children: [
        {path:'',component:DepartmentListComponent}
      ] },
      { path: 'table', component: TableComponent },
      {path:'doctor',component:DoctorListComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(hospitalRoutes)],
  exports: [RouterModule],
})
export class HospitalRoutingModule {}
