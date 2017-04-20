import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Leave } from '../../shared/leave.model';
import { LeaveService } from '../../shared/leave.service'; 

@Component({
  selector: 'app-leave',
  templateUrl: './leave-manage.component.html'
})
export class LeaveManageComponent implements OnInit {

  leaves: Leave[] = [];
  constructor(private leaveService: LeaveService,private router: Router) { }

  ngOnInit() {

  	this.leaves = this.leaveService.getLeaveEntry();
    this.leaveService.leaveEntryChanged
      .subscribe(
          (leaves: Leave[]) => {
            this.leaves = leaves;
          }
        )

  }

  deleteLeave(leaveIndex: number) {
  	this.leaveService.removeLeaveEntry(leaveIndex);
  }

  updateLeave(leaveIndex: number) {
    this.router.navigate(['/admin/update-leave', leaveIndex]);
  }

}
