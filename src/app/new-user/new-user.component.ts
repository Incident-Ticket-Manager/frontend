import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../model/User";
import {PasswordMatchValidator} from "../register/validators/PasswordMatchValidator";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl("",
      [Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    passwordConfirmation: new FormControl("", [Validators.required])
  }, [PasswordMatchValidator.passwordMatch]);

  constructor(public dialogRef: MatDialogRef<NewUserComponent>) {
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const username = JSON.parse(sessionStorage.getItem("profile")).username;
    this.dialogRef.close(new User({username: this.registerForm.get('username').value, email: this.registerForm.get('email').value, password: this.registerForm.get('password').value}));
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
  get passwordConfirmation() {
    return this.registerForm.get("passwordConfirmation");
  }


}
