import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from './user.model';

@Injectable()
export class UserService implements OnInit {
  usersChanged = new Subject<User[]>();
  private users: User[] = [];
  
  constructor(private http: Http) {
    this.getUserJson();
  }

  ngOnInit() {
    //this.getUserJson();
  }

  getUserJson() {
    this.http.get("./src/app/shared/users.json")
             .map(
                (response: Response) => {
                  const users: User[] = response.json();
                  for(let user of users) {
                    if(!user) {
                      console.log(user);
                    }
                  }
                  return users;
                }
              )
             .subscribe(
               (users: User[]) => {                 
                 this.setUsers(users);
               }
              );

  }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {   
  	return this.users.slice();
  }

  getOneUser(employeeid: string) {
    return this.users.find(u => u.employeeid === employeeid);
  }

  addUser(user: User) {
  	this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  removeUser(userIndex: number) {
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      this.usersChanged.next(this.users.slice());
    }    
  }

  updateUserStatus(userIndex: number, status: string) {
    if (userIndex > -1) {
      this.users[userIndex].status = status;
      this.usersChanged.next(this.users.slice());
    }    
  }

  updateUserDetails(userIndex: number, userData: User) {
    if (userIndex > -1) {
      this.users[userIndex] = userData;
      this.usersChanged.next(this.users.slice());
    }    
  }
}