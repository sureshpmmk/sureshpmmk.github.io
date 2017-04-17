import { Subject } from 'rxjs/Subject';

import { Project } from './project.model';

export class ProjectService {
  projectsChanged = new Subject<Project[]>();
  private projects: Project[] = require('./projects.json');//[];

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