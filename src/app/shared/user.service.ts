import { Subject } from 'rxjs/Subject';

import { User } from './user.model';

export class UserService {
  usersChanged = new Subject<User[]>();
  private users: User[] = [];

  getUsers() {
  	return this.users.slice();
  	// this.usersNew = this.users.slice();
  	// this.userlist = this.usersNew.splice(1, 1);
  	// return this.userlist;
  }

  addUser(user: User) {
  	this.users.push(user);
    //this.usersChanged.next(this.users.slice());

  }

}