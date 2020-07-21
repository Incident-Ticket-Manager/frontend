import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordMatchValidator} from "./validators/PasswordMatchValidator";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl("",
      [Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    passwordConfirmation: new FormControl("", [Validators.required])
  }, [PasswordMatchValidator.passwordMatch]);

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.password.errors);

    if (this.registerForm.valid) {
      await this.authService.register(this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      await this.router.navigate(["login"]);
      this.snackBar.open("Success : Account created");
    }
  }

  get username() {
    return this.registerForm.get("username");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get passwordConfirmation() {
    return this.registerForm.get("passwordConfirmation");
  }

}
