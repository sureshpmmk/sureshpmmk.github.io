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
   // this.getProjectsJson();
  }

  getProjectsJson() {
    this.http.get("./src/app/shared/projects.json")
             .map(
                (response: Response) => {
                  const projects: Project[] = response.json();
                  for(let project of projects) {
                    if(!project) {
                      console.log(project);
                    }
                  }
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
  	return this.projects.slice();
  }

  getOneProject(projectcode: string) {
    return this.projects.find(p => p.projectcode === projectcode);
  }

  addProject(project: Project) {
  	this.projects.push(project);
    this.projectsChanged.next(this.projects.slice());
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
  }

}