import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { Leave } from '../../shared/leave.model';
import { LeaveService } from '../../shared/leave.service'; 
import { UserService } from '../../shared/user.service';
/*import '../../../../node_modules/angular-datepicker/dist/index.min.js'*/

@Component({ 
  templateUrl: './leave-update.component.html', 
  // styleUrls: ['../../../../node_modules/angular-datepicker/dist/index.min.css'],
})
export class LeaveUpdateComponent implements OnInit {
  @ViewChild('f') leaveForm: NgForm;
  defaultLeave;
  defaultName;
  leaveSubscription;
  passedleaveIndex;
  users;
  leave;
  employename;
  leavetype;
  leavefrom;
  leaveto;

  constructor(private leaveService: LeaveService,private userService: UserService,private router: Router,private route: ActivatedRoute) {

   }

  ngOnInit() {
    this.leaveSubscription = this.route.params.subscribe(params => {
      this.passedleaveIndex = params['leaveIndex'];
      }); 
    this.getOneLeaveEntry(this.passedleaveIndex);
  }

  onSaveLeave(){
  	this.leaveService.addLeaveEntry(this.leaveForm.value);
  	this.router.navigate(['/admin/manage-leave']);

  }

   getOneLeaveEntry(passedleaveIndex: number) {
    this.users = this.userService.getUsers();
    this.leave = this.leaveService.getOneLeave(passedleaveIndex);

    this.employename   = this.leave.employename;
    this.leavetype  = this.leave.leavetype;
    this.leavefrom = this.leave.leavefrom;
    this.leaveto   = this.leave.leaveto;   
  }



}
