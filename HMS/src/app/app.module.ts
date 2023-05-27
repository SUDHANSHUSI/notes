import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { WhyUsComponent } from './pages/home/includes/why-us/why-us.component';
import { CountComponent } from './pages/home/includes/count/count.component';
import { ServiceComponent } from './pages/service/service.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { GalleryComponent } from './pages/home/includes/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentTableComponent } from './pages/user-profile/appointment-table/appointment-table.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { HeroComponent } from './pages/home/includes/hero/hero.component';
import { authInterceptor } from './services/auth-interceptor';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    WhyUsComponent,
    CountComponent,
    ServiceComponent,
    AppointmentComponent,
    DepartmentComponent,
    DoctorComponent,
    GalleryComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    UserProfileComponent,
    HeroComponent,
    AppointmentTableComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    MaterialModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:authInterceptor,
    multi:true
  },
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
