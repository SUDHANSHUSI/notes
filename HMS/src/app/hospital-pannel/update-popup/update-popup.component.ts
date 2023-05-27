import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css'],
})
export class UpdatePopupComponent implements OnInit {
  updateForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
    private toastr: ToastrService,
    private dailog: MatDialogRef<UpdatePopupComponent>
  ) {}

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      date: new FormControl(''),
      canActiveAppointment: new FormControl('false'),
    });
  }

  myFilter = (d: Date | null): boolean => {
    let day = (d || new Date()).getDay();
    if (d < new Date()) {
      return false;
    }
    return day !== 0 && day !== 6;
  };

  editData: any;

  updatedata() {
    console.log(this.updateForm.value);
    if (this.updateForm.valid) {
      this.auth
        .updateAppointment(this.data.id, this.updateForm.value)
        .subscribe((res) => {
          this.toastr.success('Update data successfully..');
          this.dailog.close();
        });
    } else {
      this.toastr.error('Enter Valid data');
    }
  }
}
