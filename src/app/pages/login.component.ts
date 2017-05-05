import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../shared/authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls :['../app.component.css']
})
export class LoginComponent {

  flag;
  success;
  validationError;
  validationError1;
  validationError2;
  auth;
  //Getting form value and assigning to loginForm	
  @ViewChild('f') loginForm: NgForm; 	
  constructor(private authService : AuthenticationService) { }

  //Validating User
  onLogin(){ 

  this.validationError='';
  this.validationError1 = '';
  this.validationError2 = '';
  this.flag = true;
  this.success = true;  
  if((this.loginForm.value.username === "") && (this.loginForm.value.password === "")){
    this.success = false;
    this.validationError = "Please fill both fields";
    this.flag === false;

    return;
  }
  if(this.loginForm.value.username == ""){
    this.validationError1 = "User name cannot be blank.";
    this.flag === false;
    return;
  }
  if(this.loginForm.value.password == ""){
    this.validationError2 = "Password cannot be blank.";
    this.flag === false;
    return;
  }    
	if(this.flag === true){    
    this.flag = this.authService.loginUser(this.loginForm.value);
  }
	if(this.flag === false)
	{
		this.validationError = 'Invalid login or password.';
		this.loginForm.reset();
    this.success = false;
	}
}

}
