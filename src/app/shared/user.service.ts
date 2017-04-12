import { Subject } from 'rxjs/Subject';

import { User } from './user.model';

export class UserService {
  usersChanged = new Subject<User[]>();
  private users: User[] = [];

  getUsers() {
  	return this.users.slice();
  }

  addUser(user: User) {
  	this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  removeUser(userIndex) {
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      this.usersChanged.next(this.users.slice());
    }    
  }

  updateUserStatus(userIndex, status) {
    if (userIndex > -1) {
      this.users[userIndex].status = status;
      this.usersChanged.next(this.users.slice());
    }    
  }

}