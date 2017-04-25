import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Leave } from '../../shared/leave.model';
import { LeaveService } from '../../shared/leave.service'; 
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave-manage.component.html'
})
export class LeaveManageComponent implements OnInit {
  leaves: Leave[] = [];
  @ViewChild('f') leaveForm: NgForm;
  defaultLeave;
  defaultName;
  users;
  formShowFlagText = 'fa fa-plus fa-lg';
  formShowFlag = false;

  constructor(private leaveService: LeaveService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {

  	this.leaves = this.leaveService.getLeaveEntry();
    this.leaveService.leaveEntryChanged
      .subscribe(
          (leaves: Leave[]) => {
            this.leaves = leaves;
          }
        )

    this.users     = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        ); 

  }

  deleteLeave(leaveIndex: number) {
  	this.leaveService.removeLeaveEntry(leaveIndex);
  }

  updateLeave(leaveIndex: number) {
    this.router.navigate(['/admin/update-leaves', leaveIndex]);
  }

  onSaveLeave(){
    this.leaveService.addLeaveEntry(this.leaveForm.value);
    this.router.navigate(['/admin/manage-leaves']);

  }

  toggleFlag() {
    this.formShowFlag = (this.formShowFlag === false) ? true : false;
    this.formShowFlagText = (this.formShowFlag === false) ? 'fa fa-plus fa-lg' : 'fa fa-minus fa-lg';
  }

}
