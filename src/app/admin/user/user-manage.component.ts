import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service'; 

@Component({
  templateUrl: './user-manage.component.html'
})
export class UserManageComponent implements OnInit {
  users: User[] = [];
  userIndex;

  constructor(private userService: UserService, private router: Router) { 
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

  updateUser(employeeId: string) {
    this.router.navigate(['/admin/update-user', employeeId]);
  }

  deleteUser(employeeId: string) {
    this.userIndex = this.users.map((user) => user.employeeid).indexOf(employeeId);
  	this.userService.removeUser(this.userIndex);
  }

  changeStatus(employeeId: string, status: string) {
    this.userIndex = this.users.map((user) => user.employeeid).indexOf(employeeId);
    this.userService.updateUserStatus(this.userIndex, status);
  }
}
