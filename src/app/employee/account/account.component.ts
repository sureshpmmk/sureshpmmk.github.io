import { Component, OnInit , ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
 @ViewChild('ff') employeeForm: NgForm;

public loggedUser = JSON.parse(localStorage.getItem("user"));
public firstname = this.loggedUser.firstname;
public lastname = this.loggedUser.lastname;
public email = this.loggedUser.email;
public userpassword = this.loggedUser.password;
public phonenumber = this.loggedUser.phonenumber;
public success = '';
public passwordtype = "password";
public showhide = "show";

  constructor() { 
    
  }

  ngOnInit() {
  }

  onUpdateAccount() {  
   localStorage.setItem('user','{"employeeid":"'+this.loggedUser.employeeid+'","firstname":"'+this.employeeForm.value.firstname+'","lastname":"'+this.employeeForm.value.lastname+'","email":"'+this.loggedUser.email+'","phonenumber":"'+this.employeeForm.value.phonenumber+'","password":"'+this.employeeForm.value.userpassword+'","usertype":"admin","shift":"general","status":"active"}');
   this.success = "Successfully Updated";  
  }
  changePasswordStatus(showhide){
    if(showhide === 'show' ){
      this.passwordtype = 'text';
      this.showhide = "hide";
    }else{
      this.passwordtype = 'password';
      this.showhide = "show";
    }    
  }

}
