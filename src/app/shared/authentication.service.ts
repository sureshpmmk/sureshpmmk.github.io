import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable()
export class AuthenticationService {
  private users = [
    new User('Test', 'Admin', 'appadmin@premiergp.com', 'admin123', 'admin')
    
  ];
  authenticatedUser;
 
  constructor(private router: Router){}
 
  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }
 
  loginUser(user){   
    this.authenticatedUser = this.users.find(u => u.email === user.username);   
    if (this.authenticatedUser && this.authenticatedUser.password === user.password){       
      localStorage.setItem("username", this.authenticatedUser.firstname);      
      this.router.navigate(['dashboard']);      
      return true;
    }   
    return false;
 
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this.router.navigate(['Login']);
    }
  } 
}