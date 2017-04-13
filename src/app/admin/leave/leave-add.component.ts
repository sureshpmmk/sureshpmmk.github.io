import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Leave } from '../../shared/leave.model';
import { LeaveService } from '../../shared/leave.service'; 
/*import '../../../../node_modules/angular-datepicker/dist/index.min.js'*/

@Component({ 
  templateUrl: './leave-add.component.html', 
  // styleUrls: ['../../../../node_modules/angular-datepicker/dist/index.min.css'],
})
export class LeaveAddComponent implements OnInit {
  @ViewChild('f') leaveForm: NgForm;
  defaultLeave;
  defaultName;

  constructor(private leaveService: LeaveService,private router: Router) {

  	this.defaultLeave = 'Privilege';
  	this.defaultName = 'Mahesh';

   }

  ngOnInit() {

  }

  onSaveLeave(){
  	this.leaveService.addLeaveEntry(this.leaveForm.value);
  	this.router.navigate(['/admin/manage-leave']);

  }


}
