import { AfterContentInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit,OnChanges,DoCheck{

  role:string=''
  isMenuRequired:boolean=true;

  constructor(private router: Router, private renderer: Renderer2,private auth:AuthService) {}

  ngDoCheck(): void {
    let currentUrl=this.router.url;
    if(currentUrl.includes('/hospital')){
      this.isMenuRequired=false;
    }else{
      this.isMenuRequired=true;
    }
    // this.role=this.auth.role
    // console.log(this.role+'++++++++++++++++++++++');
  }
  title = 'hospital_management';

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.renderer.setProperty(document.body, 'scrollTop', 0);
    });
    
  }
  
  ngOnChanges(){
    
  }

}
