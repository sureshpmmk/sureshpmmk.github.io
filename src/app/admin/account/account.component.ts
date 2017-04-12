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
    alert(this.adminForm.value.firstname);
  	localStorage.setItem('user.firstname',this.adminForm.value.firstname);
    localStorage.setItem('user.lastname',this.adminForm.value.lastname);
    localStorage.setItem('user.email',this.adminForm.value.email);
    localStorage.setItem('user.phonenumber',this.adminForm.value.phonenumber);
    //this.userForm.reset();
  }

}
