import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 
  constructor(private router:Router){}

  islogin(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }
  userProfile(){
    this.router.navigate(['/','userProfile']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }
}
