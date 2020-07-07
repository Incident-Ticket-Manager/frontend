import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../model/Client";

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {


  clientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {
    this.clientForm = new FormGroup({
      clientName: new FormControl(data.name, [Validators.required]),
      clientEmail: new FormControl(data.email, [Validators.required]),
      clientPhone: new FormControl(data.phone, [Validators.required]),
      clientAddress: new FormControl(data.address, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.dialogRef.close(
        new Client(this.data.id,
          this.clientName.value,
          this.clientEmail.value,
          this.clientPhone.value,
          this.clientAddress.value
        ));
    }
  }

  get clientName() {
    return this.clientForm.get("clientName");
  }

  get clientEmail() {
    return this.clientForm.get("clientEmail");
  }

  get clientPhone() {
    return this.clientForm.get("clientPhone");
  }

  get clientAddress() {
    return this.clientForm.get("clientAddress");
  }

}
