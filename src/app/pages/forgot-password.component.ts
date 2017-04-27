import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'forgot-password.component.html',
  styleUrls :['../app.component.css']
})
export class ForgotPasswordComponent {
  @ViewChild('f') forgotForm: NgForm;
  success = false;
	constructor() { }
  
  onResetPass() {     
   this.success = true; 
   this.forgotForm.reset();   
  }
}