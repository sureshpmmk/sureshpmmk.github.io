import { Component, OnInit , ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
 @ViewChild('ff') adminForm: NgForm;

public loggedUser = JSON.parse(localStorage.getItem("user"));
public firstname = this.loggedUser.firstname;
public lastname = this.loggedUser.lastname;
public email = this.loggedUser.email;
public phonenumber = this.loggedUser.phonenumber;

  constructor() { 
    
  }

  ngOnInit() {
  }

  onUpdateAccount() {
    localStorage.setItem('user','{"employeeid":"'+this.loggedUser.employeeid+'","firstname":"'+this.adminForm.value.firstname+'","lastname":"'+this.adminForm.value.lastname+'","email":"'+this.loggedUser.email+'","phonenumber":"'+this.adminForm.value.phonenumber+'","password":"admin123","usertype":"admin","shift":"general","status":"active"}');

  }
  onCancelAccount() {
    this.adminForm.reset();
  }

}
