import {AbstractControl} from "@angular/forms";

export class PasswordMatchValidator {

  static passwordMatch(form: AbstractControl): {[key: string]: boolean} | null {
    const password = form.get("password");
    const passwordConfirmation = form.get("passwordConfirmation");



    if (password.value !== passwordConfirmation.value) {
      form.get("passwordConfirmation").setErrors({ ConfirmPassword: true });
      console.log("password don't match");
    }

    return null;
  }

}
