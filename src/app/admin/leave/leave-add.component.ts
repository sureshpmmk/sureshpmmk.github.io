import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Leave } from '../../shared/leave.model';
import { LeaveService } from '../../shared/leave.service'; 

@Component({ 
  templateUrl: './leave-add.component.html',  
})
export class LeaveAddComponent implements OnInit {
  @ViewChild('f') leaveForm: NgForm;
  defaultLeave;
  defaultName;

  constructor(private leaveService: LeaveService,private router: Router) {

  	this.defaultLeave = 'Privilege';
  	this.defaultName = 1;

   }

  ngOnInit() {

  }

  onSaveLeave(){
  	this.leaveService.addLeaveEntry(this.leaveForm.value);
  	this.router.navigate(['/admin/manage-leave']);

  }


}
