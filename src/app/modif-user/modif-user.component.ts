import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../model/User";

@Component({
  selector: 'app-modif-user',
  templateUrl: './modif-user.component.html',
  styleUrls: ['./modif-user.component.css']
})
export class ModifUserComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl("",
      [Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
  });

  constructor(public dialogRef: MatDialogRef<ModifUserComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = JSON.parse(sessionStorage.getItem("profile")).username;
    this.dialogRef.close(new User({name: this.registerForm.get('username').value, email: this.registerForm.get('email').value, password: this.registerForm.get('password').value}));
  }

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

}
