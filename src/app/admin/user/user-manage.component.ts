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
  }

  deleteUser(UserIndex: number) {
  	console.log(UserIndex);
  }
}
