import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service'; 

@Component({
  templateUrl: './user-manage.component.html'
})
export class UserManageComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );
  }

  deleteUser(userIndex: number) {
  	this.userService.removeUser(userIndex);
  }

  changeStatus(userIndex: number, status: string) {
    this.userService.updateUserStatus(userIndex, status);
  }
}
