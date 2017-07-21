import { UserService } from './../user/user.service';
import { User } from './../user/user';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  @Input() user: User

  private alive: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  saveUser() {
    this.userService.update(this.user)
      .takeWhile(() => this.alive)
      .subscribe();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
