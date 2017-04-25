import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service'; 

@Component({
  templateUrl: './user-manage.component.html',
  styleUrls: ['../../shared/validation.component.scss']
})
export class UserManageComponent implements OnInit {
  @ViewChild('f') userForm: NgForm;
  users: User[] = [];
  userIndex;  
  defaultUsertype;
  defaultShift;
  randPassword;
  defaultStatus;

  constructor(private userService: UserService, private router: Router) { 

    this.defaultUsertype = 'user';
    this.defaultShift    = 'morning';
    this.randPassword    = '12345';
    this.defaultStatus   = 'active';

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
    this.router.navigate(['/admin/update-employee', employeeId]);
  }

  deleteUser(employeeId: string) {
    this.userIndex = this.users.map((user) => user.employeeid).indexOf(employeeId);
  	this.userService.removeUser(this.userIndex);
  }

  changeStatus(employeeId: string, status: string) {
    this.userIndex = this.users.map((user) => user.employeeid).indexOf(employeeId);
    this.userService.updateUserStatus(this.userIndex, status);
  }
  onSubmit() {
    this.userService.addUser(this.userForm.value);
    this.router.navigate(['/admin/manage-employee']);
    this.userForm.reset();

  }

  cancel() {
    this.router.navigate(['/admin/manage-employee']);
    this.userForm.reset();
  }
}
