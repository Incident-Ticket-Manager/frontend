import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Client} from "../model/Client";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  clientForm = new FormGroup({
    clientName: new FormControl("", [Validators.required]),
    clientEmail: new FormControl("", [Validators.required]),
    clientPhone: new FormControl("", [Validators.required]),
    clientAddress: new FormControl("", [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<CreateClientComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.dialogRef.close(
        new Client(null,
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
