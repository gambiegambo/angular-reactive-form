import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  errorMessage: string;
  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must contain at least 1 characters.',
      'maxlength': 'Username cannot contain more than 10.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must contain at least 6 characters.',
      'maxlength': 'Password cannot contain more than 10.'
    }
  };

  private alive: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onLogin() {
    const formModel = this.loginForm.value;
    const username = formModel.username as string;
    const password = formModel.password as string;
    this.loginService.login(username, password)
      .takeWhile(() => this.alive)
      .subscribe(
      data => {
        if (data[0] && data[0].token) {
          this.errorMessage = 'Login Success';
        } else {
          this.errorMessage = 'Login Fail';
        }
      }
      , error => { this.errorMessage = 'Login Fail'; }
      );
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
