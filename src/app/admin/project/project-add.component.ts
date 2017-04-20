import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';

@Component({
  templateUrl: './project-add.component.html'
})
export class ProjectAddComponent implements OnInit {
  @ViewChild('f') projectForm: NgForm;
  startdate;
  status;
  users;
  user;
  teammembers = [];
  projectData: Project[] = [];
  
  constructor(private projectService: ProjectService, 
              private userService: UserService,
              private router: Router) {
    this.startdate = Date.now();
    this.status    = 'active';
    this.users     = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );
  }

  ngOnInit() {
    this.startdate = Date.now();
    this.status    = 'active';
    this.users     = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );
  }

  onSubmit() {  
    this.users     = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );

    let i=0;
    for(let teammemberId of this.projectForm.value.teammembers) {
      this.user = this.users.find(u => u.employeeid === teammemberId);
      this.teammembers[i] = { "id" : this.user.employeeid,
                              "name" : this.user.firstname + ' ' + this.user.lastname };
      i++;
    }
    this.projectForm.value.teammembers = this.teammembers;
    this.projectService.addProject(this.projectForm.value);
    this.router.navigate(['/admin/manage-project']);
  }

  cancel() {
    this.router.navigate(['/admin/manage-project']);
  }
}
