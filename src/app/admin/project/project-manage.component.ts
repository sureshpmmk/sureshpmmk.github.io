import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';

import { ProjectUpdateComponent }  from './project-update.component';

@Component({
  templateUrl: './project-manage.component.html'
})
export class ProjectManageComponent implements OnInit {  
  projects: Project[] = [];
  projectsDetails = [];
  teammemberNames;
  projectIndex;

  constructor(private projectService: ProjectService,
      			  private projectUpdateComponent: ProjectUpdateComponent,
      			  private router: Router) { }

  ngOnInit() {   
    this.getProjectList();
  }

  getProjectList() {
    this.projectsDetails = this.projectService.getProjects();
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projectsDetails = projects;
            this.setEmployeeNames(this.projectsDetails);
        });
  }

  setEmployeeNames(projectsDetails) {
    for(let i in projectsDetails) {
      this.teammemberNames = [];
      for(let teammember of projectsDetails[i].teammembers) {
        this.teammemberNames.push(teammember['name']);
      }
      projectsDetails[i].teammemberNames = this.teammemberNames;
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
