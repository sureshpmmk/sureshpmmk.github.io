import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';
import { UserService } from '../../shared/user.service';

@Component({
  templateUrl: './project-add.component.html'
})
export class ProjectAddComponent implements OnInit {
  @ViewChild('f') projectForm: NgForm;
  startdate;
  status;
  users;
  teammembers = [];
  projectData: Project[] = [];
  
  constructor(private projectService: ProjectService, private userService: UserService) {
    this.startdate = Date.now();
    this.status    = 'active';
    this.users     = this.userService.getUsers();
   // this.teammembers = [ this.users[0].employeeid ];

  }

  ngOnInit() {
  }

  onSubmit() {  	
    this.projectService.addProject(this.projectForm.value);
  }

}
