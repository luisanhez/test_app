import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  private readonly emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.+[a-zA-Z0-9-]{2,}){1}$/;
  readonly ERROR_MESSAGES = {
    email: 'El email introducido no es válido',
    password: 'Contraseña inferior a 5 carácteres',
  };

  form: FormGroup;
  submitted = false;

  constructor() {
    this.initForm();
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.initForm();
    this.submitted = false;
    console.log('Login: OK');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  private initForm() {
    this.form = new FormGroup({
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
  }
}
