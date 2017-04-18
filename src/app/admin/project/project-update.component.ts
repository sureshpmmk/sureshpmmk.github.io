import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';
import { UserService } from '../../shared/user.service';

@Component({
  templateUrl: './project-update.component.html'
})
export class ProjectUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('f') projectForm: NgForm;
  project;  
  users;
  passedProjectCode;
  projectcode;
  projecttitle;
  hoursrequired;
  hourstaken;
  teammembers = [];
  startdate;
  finishdate;
  status;
  projectCodeSubscription;
  projects;
  projectIndex;

  constructor(private projectService: ProjectService, 
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    //this.startdate = new Date().toISOString().slice(0, 16);
  }

  ngOnInit() {
    this.projectCodeSubscription = this.route.params.subscribe(params => {
      this.passedProjectCode = params['projectCode']; 
    });

    this.getOneProject(this.passedProjectCode);    
  }

  ngOnDestroy() {
    this.projectCodeSubscription.unsubscribe();
  }

  getOneProject(passedProjectCode: string) {
    this.users = this.userService.getUsers();
    this.project = this.projectService.getOneProject(passedProjectCode);

    this.projectcode   = this.project.projectcode;
    this.projecttitle  = this.project.projecttitle;
    this.hoursrequired = this.project.hoursrequired;
    this.hourstaken    = this.project.hourstaken;
    this.teammembers   = this.project.teammembers;
    this.startdate     = new Date(this.project.startdate);
    this.finishdate    = new Date(this.project.finishdate);
    this.status        = this.project.status;
  }

  updateProject() {
    this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projects = projects;
        });
  	
    this.projectcode  = this.projectForm.value['projectcode'];
    this.projectIndex = this.projects.map((project) => project.projectcode).indexOf(this.projectcode); 
  	this.projectService.updateProjectDetails(this.projectIndex, this.projectForm.value);
    this.router.navigate(['/admin/manage-project']);
  }

  cancel() {
    this.router.navigate(['/admin/manage-project']);
  }

}
