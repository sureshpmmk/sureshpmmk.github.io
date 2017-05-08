import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Leave } from '../../shared/leave.model';
import { LeaveService } from '../../shared/leave.service'; 
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave-manage.component.html',
  styleUrls: ['../../../assets/css/custom.css']
})
export class LeaveManageComponent implements OnInit {
  leaves: Leave[] = [];
  @ViewChild('f') leaveForm: NgForm;
  defaultLeave = "Sick Leave";;
  defaultName;
  users;
  formShowFlagText = 'fa fa-plus fa-lg';
  formShowFlag = false;
  leaveIndex;
  notValid; 
  flag_submit = true;  
  validationError1 = ""; 
  validationError2 = "";
  validationError3 = ""; 

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
    if((this.leaveForm.value.employename === "")){     
     this.validationError1 = "Employee field cannot be empty.";
     this.flag_submit == false;
     }
     if(this.leaveForm.value.leavefrom === ""){
     this.validationError2 = "Please enter a valid from date.";     
     this.flag_submit == false; 
     }
     if(this.leaveForm.value.leaveto === ""){
     this.validationError3 = "Please enter a valid to date.";
     this.flag_submit == false;
     }
     else if(this.leaveForm.valid && this.flag_submit == true){
     this.leaveService.addLeaveEntry(this.leaveForm.value);
     this.router.navigate(['/admin/manage-leaves']);
    }
  }  

  toggleFlag() {
    this.formShowFlag = (this.formShowFlag === false) ? true : false;
    this.formShowFlagText = (this.formShowFlag === false) ? 'fa fa-plus fa-lg' : 'fa fa-minus fa-lg';
  }
  showModel(leave:string){ 
    document.querySelector('body').classList.remove('modal-open');
    this.leaveIndex = leave;             
  }  

}
