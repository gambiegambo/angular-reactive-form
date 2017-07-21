import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: []
})
export class UserComponent implements OnInit, OnDestroy {

  errorMessage: string;
  users: User[];
  selectedUser: User;

  private alive: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .takeWhile(() => this.alive)
      .subscribe(users => this.users = users,
      error => this.errorMessage = <any>error);
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
