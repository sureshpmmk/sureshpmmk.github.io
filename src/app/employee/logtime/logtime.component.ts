import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';

@Component({
  templateUrl: './logtime.component.html'
})
export class LogtimeComponent implements OnInit {
  @ViewChild('f') logForm: NgForm;
  date;
  projects: Project[] = [];
  project;
  timerRunning = false;
  time: string = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
  t;
  employee = JSON.parse(localStorage.getItem('user'));
  logid = 0;

  constructor(private projectService: ProjectService) {  }

  ngOnInit() {
  	this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projects = projects;
        });
  	this.project = '';
  	this.date = new Date();
  }

  startTimeLog() {
    
    this.date = new Date();
    
    console.log(this.logForm.value);
  	this.timerRunning = true;
  	
  	this.t = setInterval(()=> { 
  		this.add();
  	}, 1000);
    this.logid++;
  }

  stopTimeLog() {
    
    this.date = new Date();
    console.log(this.logForm.value);
  	this.timerRunning = false;
  	this.time = "00:00:00";
    this.seconds = 0;
    this.minutes = 0; 
    this.hours = 0;
    clearInterval(this.t);
  }

  add() {
  	this.seconds++;
    if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes >= 60) {
            this.minutes = 0;
            this.hours++;
        }
    }
    
    this.time = (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);

    //this.startTimeLog();
  }
}
