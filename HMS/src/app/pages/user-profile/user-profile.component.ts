import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
fname:''
lname:''
email:''
address:''
phone:''
userDetails
profileDp='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  constructor(private auth:AuthService,private toastr:ToastrService,private router:Router) {
    
  }
  ngOnInit(): void {
    this.userDetail();
  }

  imageUpload(event:any):void{
    const file:File=event.target.files[0];
    
  }
  
  logout(){
    this.auth.loggedOut();
    this.toastr.success('Logout successfully..');
    this.router.navigate(['/home']);
  }

  userDetail(){
    this.auth.userDetail().subscribe((detail)=>{
      console.log(detail)
      if(detail){
        this.userDetails =detail.user
      }else{
        this.auth.loggedOut()
      }
    // this.email=detail.user.email
    //   this.address=detail.user.address
    //   this.phone=detail.user.phoneNum
    //   this.fname=detail.user.firstName
    //   this.lname=detail.user.lastName
    })
  }
}
