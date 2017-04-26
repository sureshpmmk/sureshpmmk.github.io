import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service'; 

@Component({
  templateUrl: './user-add.component.html'
})
export class UserAddComponent implements OnInit {
  @ViewChild('f') userForm: NgForm;
  defaultUsertype;
  defaultShift;
  randPassword;
  defaultStatus;

  constructor(private userService: UserService, private router: Router) {
    this.defaultUsertype = 'employee';
    this.defaultShift    = 'morning';
    this.randPassword    = '12345';
    this.defaultStatus   = 'active';
  }

  ngOnInit() {
  }

  onSubmit() {
  	this.userService.addUser(this.userForm.value);
    this.router.navigate(['/admin/manage-user']);
  }

  cancel() {
    this.router.navigate(['/admin/manage-user']);
  }
}
