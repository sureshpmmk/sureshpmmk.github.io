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
  membersids = [];
  teammembers = [];
  users;
  teammember = [];

  constructor(private projectService: ProjectService, private userService: UserService) {
    this.startdate = Date.now();
    this.status    = 'active';
    this.users = this.userService.getUsers();
  }

  ngOnInit() {
  }

  onSubmit() {
  	this.users = this.userService.getUsers();
  	this.membersids = this.projectForm.value.teammembers;
  	for(let memberid of this.membersids) {
  		this.teammember = this.users.find(u => u.employeeid === memberid);
  		this.teammembers.push(this.teammember);
  	}

  	console.log(this.teammembers);
  	//this.projectService.addProject(this.projectForm.value);
  }

}
