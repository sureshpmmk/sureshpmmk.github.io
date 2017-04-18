import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service'; 
import { UserService } from '../../shared/user.service';

import { ProjectUpdateComponent }  from './project-update.component';

@Component({
  templateUrl: './project-manage.component.html'
})
export class ProjectManageComponent implements OnInit {  
  projects: Project[] = [];
  projectsDetails = [];
  users;
  teammemberNames;
  projectIndex;

  constructor(private projectService: ProjectService, 
  			  private userService: UserService,
  			  private projectUpdateComponent: ProjectUpdateComponent,
  			  private router: Router) { }

  ngOnInit() {    
    this.getProjectList();
  }

  getProjectList() {
    this.projectsDetails = [];
    this.users = this.userService.getUsers();
    this.projects = this.projectService.getProjects();

    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projects = projects;
        });

    this.projectsDetails = this.projects;
    
    for(let i in this.projects) {
      let teammembersIds = this.projects[i].teammembers;
      this.teammemberNames = [];
      for(let j in teammembersIds) {
        let employee = this.users.find(u => u.employeeid === teammembersIds[j]);
        let employeeName = employee.firstname + ' ' + employee.lastname;
        this.teammemberNames.push(employeeName);
      }
      this.projectsDetails[i].teammemberNames = this.teammemberNames;
    }
  }

  updateProject(projectCode: string) {
  	this.router.navigate(['/admin/update-project', projectCode]);
  }

  changeProjectStatus(projectCode: string, status: string) {
    this.projectIndex = this.projects.map((project) => project.projectcode).indexOf(projectCode); 
    this.projectService.updateProjectStatus(this.projectIndex, status);
  }

  deleteProject(projectCode: string) {
    this.projectIndex = this.projects.map((project) => project.projectcode).indexOf(projectCode); 
    this.projectService.removeProject(this.projectIndex);
    this.getProjectList();
  }
}
