import { Subject } from 'rxjs/Subject';

import { User } from './user.model';

export class UserService {
  usersChanged = new Subject<User[]>();
  private users: User[] = require('./users.json');

  getUsers() {    
  	return this.users.slice();
  }

  addUser(user: User) {
  	this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  updateUser(userIndex: number, user: User) {
    if (userIndex > -1) {
      this.users[userIndex] = user;
      this.usersChanged.next(this.users.slice());
    }    
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

}