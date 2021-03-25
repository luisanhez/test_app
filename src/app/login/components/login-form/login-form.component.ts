import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  private readonly emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.+[a-zA-Z0-9-]{2,}){1}$/;

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailRegEx),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    remember: new FormControl(false),
  });

  formSubmitted = false;

  public submit() {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    console.log('Login: OK');
  }

  get emailError() {
    return this.form.get('email').errors;
  }

  get passwordError() {
    return this.form.get('password').errors;
  }
}
