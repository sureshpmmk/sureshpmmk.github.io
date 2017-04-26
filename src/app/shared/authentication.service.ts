import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable()
export class AuthenticationService {
  private users = [
    new User('5000', 'Test', 'Admin', 'appadmin@premiergp.com', '123456789', 'admin123', 'admin', 'general', 'active'),
    new User('5123','Lakshmikanth', 'V', 'lvm@premiergp.com', '9865321474', '12345', 'employee', 'general','active'),
    new User('5100','Subina', 'KK', 'member01@morganmckinley.in', '9865321474', 'mmk2017', 'employee', 'general','active')
    
  ];
  authenticatedUser;
 
  constructor(private router: Router){}
 
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    this.router.navigate(['pages/login']);
  }
 
  loginUser(user){   
    this.authenticatedUser = this.users.find(u => u.email === user.username);   
    if (this.authenticatedUser && this.authenticatedUser.password === user.password){ 
      localStorage.setItem("user", JSON.stringify(this.authenticatedUser));      
      localStorage.setItem("username", this.authenticatedUser.firstname); 
      if(this.authenticatedUser.usertype == 'admin')     
        this.router.navigate(['dashboard']);
      else
        this.router.navigate(['employee/dashboard']);
      return true;
    }   
    return false;
 
  }
 
   checkCredentials() {
    if (localStorage.getItem("user") === null){
        this.router.navigate(['pages/login']);
    }
  } 
}