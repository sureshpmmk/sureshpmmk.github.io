import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../shared/authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls :['../app.component.css']
})
export class LoginComponent {

  flag;
  validationError = '';
  //Getting form value and assigning to loginForm	
  @ViewChild('f') loginForm: NgForm; 	
  constructor(private authService : AuthenticationService) { }

  //Validating User
  onLogin(){ 
	this.flag = this.authService.loginUser(this.loginForm.value);
	if(this.flag === false)
	{
		this.validationError = 'Authentication failed.';
		this.loginForm.reset();
	}
}

}
