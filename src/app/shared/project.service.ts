import { Subject } from 'rxjs/Subject';

import { Project } from './project.model';

export class ProjectService {
  projectsChanged = new Subject<Project[]>();
  private projects: Project[] = [];

  getProjects() {
  	return this.projects.slice();
  }

  addProject(project: Project) {
  	this.projects.push(project);
    this.projectsChanged.next(this.projects.slice());
  }

  removeProject(projectIndex) {
    if (projectIndex > -1) {
      this.projects.splice(projectIndex, 1);
      this.projectsChanged.next(this.projects.slice());
    }    
  }

  updateProjectStatus(projectIndex, status) {
    if (projectIndex > -1) {
      this.projects[projectIndex].status = status;
      this.projectsChanged.next(this.projects.slice());
    }    
  }

}