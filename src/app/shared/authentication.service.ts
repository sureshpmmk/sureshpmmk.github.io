import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable()
export class AuthenticationService {
  private users = [
    new User('5000', 'Test', 'Admin', 'appadmin@premiergp.com', '123456789', 'admin123', 'admin', 'general', 'active'),
    new User('5123','Lakshmikanth', 'V', 'lvm@premiergp.com', '9865321474', '12345', 'admin', 'general','active')
    
  ];
  authenticatedUser;
 
  constructor(private router: Router){}
 
  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['pages/login']);
  }
 
  loginUser(user){   
    this.authenticatedUser = this.users.find(u => u.email === user.username);   
    if (this.authenticatedUser && this.authenticatedUser.password === user.password){ 
      localStorage.setItem("user", JSON.stringify(this.authenticatedUser));      
      localStorage.setItem("username", this.authenticatedUser.firstname);      
      this.router.navigate(['dashboard']);      
      return true;
    }   
    return false;
 
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this.router.navigate(['pages/login']);
    }
  } 
}