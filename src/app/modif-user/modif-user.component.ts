import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../model/User";

export interface DialogData {
  name: string;
  address: string; 
  phone: string; 
  email: string; 
}

@Component({
  selector: 'app-modif-user',
  templateUrl: './modif-user.component.html',
  styleUrls: ['./modif-user.component.css']
})
export class ModifUserComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(public dialogRef: MatDialogRef<ModifUserComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = JSON.parse(sessionStorage.getItem("profile")).username;
    this.dialogRef.close(new User({name: this.name.value, phone: this.phone.value, address: this.address.value, email: this.email.value}));
  }

  get name() {
    return this.registerForm.get('name');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get address() {
    return this.registerForm.get('address');
  }
  get email() {
    return this.registerForm.get('email');
  }

}
