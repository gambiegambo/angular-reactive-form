import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from './../user/user.service';
import { User } from './../user/user';
import "rxjs/add/operator/takeWhile";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy, AfterViewChecked {

  user: User = new User();
  errorMessage: String;
  photos = [
    { name: 'marcoramires', url: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg' },
    { name: 'stephenmoon', url: 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg' },
    { name: 'bigmancho', url: 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg' },
    { name: 'josephstein', url: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg' }
  ];

  private alive: boolean = true;

  userForm: NgForm;
  @ViewChild('userForm') currentForm: NgForm;
  formErrors = {
    'firstname': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'Firstname is required',
      'pattern': 'Firstname should contain only character with 1 to 15 length'
    }
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location) {
    // default
    this.user.photo = 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg';
  }

  ngOnInit() {

  }

  addUser() {
    this.userService.add(this.user)
      .takeWhile(() => this.alive)
      .subscribe(() => this.router.navigate(['/users']),
      error => this.errorMessage = error);
  }

  goBack() {
    this.location.back();
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.userForm) { return; }
    this.userForm = this.currentForm;
    if (this.userForm) {
      this.userForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm.form;

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
