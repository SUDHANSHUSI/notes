import { Component } from '@angular/core';

@Component({
  selector: 'app-hospital-pannel',
  templateUrl: './hospital-pannel.component.html',
  styleUrls: ['./hospital-pannel.component.css']
})
export class HospitalPannelComponent {
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
