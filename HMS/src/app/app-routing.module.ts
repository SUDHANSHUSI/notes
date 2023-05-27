import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServiceComponent } from './pages/service/service.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { DepartmentComponent } from './pages/department/department.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';
import { AllreadyLoginGuard } from './services/allready-login.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'appointment',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'contact', component: ContactComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'department', component: DepartmentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AllreadyLoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AllreadyLoginGuard],
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hospital',
    loadChildren: () =>
      import('../app/hospital-pannel/hospital.module').then(
        (mod) => mod.HospitalModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
