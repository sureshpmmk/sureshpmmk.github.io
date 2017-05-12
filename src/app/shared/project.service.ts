import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Project } from './project.model';

@Injectable()
export class ProjectService implements OnInit {
  projectsChanged = new Subject<Project[]>();
  private projects: Project[] = [];

  constructor(private http: Http) {
    this.getProjectsJson();
  }

  ngOnInit() {
  }

  getProjectsJson() {
    this.http.get("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/projects")
             .map(
                (response: Response) =>{
                  const resp = response.json();
                  
                  const projects = resp.Result;              
                  return projects;

                }
              )
             .subscribe(
               (projects: Project[]) => {                 
                 this.setProjects(projects);
               }
              );
              
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
   
    this.projectsChanged.next(this.projects.slice());
  }

  getProjects() {
     this.projectsChanged.subscribe(
      (projects: Project[]) => {
            this.projects = projects;
          
          }
        ); 
  	return this.projects.slice();
  }

  getOneProject(projectCode: string) {
    return this.projects.find(p => p.projectCode === projectCode);
  }

  addProject(project: Project) {
      this.projects.unshift(project);
      this.projectsChanged.next(this.projects.slice());
      const headers = new Headers({ 'Content-Type' : 'application/json'});
      return this.http.post("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/projects",
      project,
      {headers: headers});
  }

  removeProject(projectIndex: number) {
    if (projectIndex > -1) {
      this.projects.splice(projectIndex, 1);
      this.projectsChanged.next(this.projects.slice());
    }    
  }

  updateProjectStatus(projectIndex:  number, status: string) {
    if (projectIndex > -1) {
      this.projects[projectIndex].status = status;
      this.projectsChanged.next(this.projects.slice());
    }    
  }

  updateProjectDetails(projectIndex: number, projectData: Project) {
    if (projectIndex > -1) {
      this.projects[projectIndex] = projectData;
      this.projectsChanged.next(this.projects.slice());
    }  
    const headers = new Headers({ 'Content-Type' : 'application/json'});
      return this.http.post("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/projects/"+projectIndex,
      projectData,
       {headers: headers});  
  }

}