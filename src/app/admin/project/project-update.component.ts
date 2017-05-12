import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';

@Component({
  templateUrl: './project-update.component.html',
  styleUrls: ['../../../assets/css/custom.css']
})
export class ProjectUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('f') projectForm: NgForm;
  project;  
  users;
  user;
  passedProjectCode;
  projectCode;
  projectTitle;
  hoursRequired;
  hoursSpent;
  teamMembers = [];
  startDate;
  finishDate;
  status;
  projectCodeSubscription;
  projects;
  projectIndex;
  estimatedDate;
  actualDate;
  projectId;

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
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );

    this.project = this.projectService.getOneProject(passedProjectCode);
    

    this.projectCode   = this.project.projectCode;    
    this.projectTitle  = this.project.projectTitle;
    this.hoursRequired = this.project.hoursRequired;
    this.hoursSpent    = this.project.hoursSpent;
    //this.teamMembers   = this.project.teamMembers;
    this.startDate     = this.project.startDate;
    this.finishDate    = this.project.finishDate;
    this.status        = this.project.status;
    this.actualDate = this.project.actualDate;
    this.estimatedDate = this.project.estimatedDate;
    this.projectId = this.project.id;

    for(let teammember of this.project.teamMembers) {
      this.teamMembers.push(''+teammember.id+'');
      
    }
  }

  updateProject() {
    this.users     = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );
      
    let i=0;
    for(let teammemberId of this.projectForm.value.teamMembers) {
      this.user = this.users.find(u => u.employeeid === teammemberId);
      this.teamMembers[i] = { "id" : this.user.employeeid,
                              "name" : this.user.firstname + ' ' + this.user.lastname };
      i++;
    }
    this.projectForm.value.teamMembers = this.teamMembers;

    this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projects = projects;
        });
  	
    this.projectCode  = this.projectForm.value.projectId;
    this.projectIndex = this.projects.map((project) => project.projectCode).indexOf(this.projectCode); 
  	this.projectService.updateProjectDetails(this.projectCode, this.projectForm.value).subscribe(
      (response: Response) => console.log(response),
      (error)  => console.log(error)
    );
    this.router.navigate(['/admin/manage-projects']);
  }

  cancel() {
    this.router.navigate(['/admin/manage-projects']);
  }

}
