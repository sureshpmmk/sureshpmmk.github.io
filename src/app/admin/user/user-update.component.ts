import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  templateUrl: './user-update.component.html',
  styleUrls: ['../../../assets/css/custom.css']
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('f') userForm: NgForm;
  users;
  user;
  passedEmployeeid
  employeeid;
  firstname;
  lastname;
  designation;
  email;
  phonenumber;
  password;
  usertype;
  shift;
  status;
  userSubscription;
  userIndex;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    //this.startdate = new Date().toISOString().slice(0, 16);
  }

  ngOnInit() {
    this.userSubscription = this.route.params.subscribe(params => {
      this.passedEmployeeid = params['employeeId']; 
    });

    this.getOneUser(this.passedEmployeeid);    
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getOneUser(passedEmployeeid: string) {
    this.user = this.userService.getOneUser(passedEmployeeid);
   // console.log(this.user);

    this.employeeid  = this.user.employeeid;
    this.firstname   = this.user.firstname;
    this.lastname    = this.user.lastname;
    this.email       = this.user.email;
    this.phonenumber = this.user.phonenumber;
    this.password    = this.user.password;
    this.usertype    = this.user.usertype;
    this.shift       = this.user.shift;
    this.status      = this.user.status;
    this.designation = this.user.designation;
  }

  updateUser() {
    this.users = this.userService.getUsers();
    this.userService.usersChanged
        .subscribe(
          (users: User[]) => {
            this.users = users;
        });
  	
    this.employeeid = this.userForm.value['employeeid'];
    this.userIndex = this.users.map((user) => user.employeeid).indexOf(this.employeeid); 
  	this.userService.updateUserDetails(this.userIndex, this.userForm.value);
    this.router.navigate(['/admin/manage-employee']);
  }

  cancel() {
    this.router.navigate(['/admin/manage-employee']);
  }

}
