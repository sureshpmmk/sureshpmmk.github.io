import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'forgot-password.component.html',
  styleUrls :['../app.component.css']
})
export class ForgotPasswordComponent {
  success = false;
	constructor() { }
  
  onResetPass() {     
   this.success = true;  
  }
}