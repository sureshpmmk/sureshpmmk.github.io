import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';

import { ProjectUpdateComponent }  from './project-update.component';

@Component({
  templateUrl: './project-manage.component.html',
  styleUrls: ['../../../assets/css/custom.css']
})
export class ProjectManageComponent implements OnInit {  
  projects: Project[] = [];
  projectsDetails = [];
  teammemberNames;
  projectIndex;
  @ViewChild('f') projectForm: NgForm;
  startDate;
  status;
  users;
  user;
  teammembers = [];
  projectData: Project[] = [];
  formShowFlagText = 'fa fa-plus fa-lg';
  formShowFlag = false;
  projectId;
  notValid;
  projectMembers;
  members;
  project_code;
  project_status;
  projectid;

  constructor(private projectService: ProjectService,
      			  private projectUpdateComponent: ProjectUpdateComponent,
              private userService: UserService,
      			  private router: Router) {

    this.startDate = Date.now();
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
    this.getProjectList();

    this.startDate = Date.now();
    this.status    = 'Active';
    this.users     = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );
      //  console.log(this.getProjectList());
  }

  getProjectList() {    
    //this.projects = this.projectService.getProjects();
    
   // this.projectsDetails = this.projectService.getProjects();
    
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projects = projects;
            this.projectsDetails = projects;
            this.setEmployeeNames(this.projectsDetails);
            //console.log(this.projectsDetails);
        });
       
        
  }

  setEmployeeNames(projectsDetails) {
    for(let i in projectsDetails) {
      this.teammemberNames = [];
      for(let teammember of projectsDetails[i].teamMembers) {
        this.teammemberNames.push(teammember['name']);
      }
      projectsDetails[i].teammemberNames = this.teammemberNames;
    }
  }

  updateProject(projectCode: string) {
  	this.router.navigate(['/admin/update-project', projectCode]);
  }

  changeProjectStatus(projectCode: string, status: string,projectid: string) {
    document.querySelector('body').classList.remove('modal-open'); 
    this.project_code = projectCode;
    this.project_status = status;
    this.projectid = projectid ;    
  }
  confirmProjectStatus (projectCode: string, status: string){    
    this.projectIndex = this.projects.map((project) => project.projectCode).indexOf(projectCode);    
    if (this.projectIndex > -1) {
      this.projects[this.projectIndex].status = status;
    } 
   // console.log(this.projects[this.projectIndex].status);   
    this.projectService.updateProjectDetails(this.projectid, this.projects[this.projectIndex]).subscribe(
      (response: Response) => console.log(response),
      (error)  => console.log(error)
    );
    //console.log(this.projects[this.projectIndex].status); 
    this.router.navigate(['/admin/manage-projects']);    
  }

  deleteProject(projectCode: string) {
    this.projectIndex = this.projects.map((project) => project.projectCode).indexOf(projectCode); 
    this.projectService.removeProject(this.projectIndex);
    this.getProjectList();
  }

  onSubmit() {      
    this.notValid = '';
    if(this.projectForm.valid)
    {  
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
      this.teammembers[i] = { "id" : this.user.employeeid,
                              "name" : this.user.firstname + ' ' + this.user.lastname };
      i++;
    }
    
    this.projectForm.value.teamMembers = this.teammembers;    
    this.projectService.addProject(this.projectForm.value).subscribe(
      (response: Response) => console.log(response),
      (error)  => console.log(error)
    );
    this.router.navigate(['/admin/manage-projects']);
    this.projectForm.reset();
  }
  else{
     this.notValid ="Form is not valid.";     
  }
}

  cancel() {
    this.projectForm.reset();
    this.router.navigate(['/admin/manage-projects']);
  }

  toggleFlag() {
    this.formShowFlag = (this.formShowFlag === false) ? true : false;
    this.formShowFlagText = (this.formShowFlag === false) ? 'fa fa-plus fa-lg' : 'fa fa-minus fa-lg';
  }
  showModel(projectCode:string){
    document.querySelector('body').classList.remove('modal-open'); 
    this.projectId = projectCode;             
  }
  teamMembers(projectCode:string){
    document.querySelector('body').classList.remove('modal-open'); 
    this.projectMembers = this.projectService.getOneProject(projectCode);
    this.members = this.projectMembers.teammemberNames;
  }
}
