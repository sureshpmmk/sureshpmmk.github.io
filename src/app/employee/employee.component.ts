import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { LogsService } from '../shared/logs.service';
import { Logs } from '../shared/logs.model';

@Component({
  // tslint:disable-next-line
  selector: 'employee-header',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
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
  logid = 100;
  log;
  logs: Logs[] = [];
  logsbyProjects: Logs[] = [];
  logsProjectDetailed = [];
  projecttitle = '';
  logIndex;
  dateInterval;

  constructor(private projectService: ProjectService, private logsService: LogsService) {  }

  ngOnInit() {

  	this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projects = projects;
        });
  	this.project = '';

    this.dateInterval = setInterval(() => {
        this.date =  new Date();
     }, 1000);
  }

  startTimeLog() {
    this.log = [];
    this.logid++;

    this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projects = projects;
        });

    let selectedProject = this.projects.find(p => p.projectcode === this.logForm.value.project);
    this.projecttitle = selectedProject.projecttitle;
    this.log.push({
                "logid" : this.logid,
                "employeeid" : this.logForm.value.employeeid,
                "employeename" : this.logForm.value.employeename,
                "projectcode" : this.logForm.value.project,
                "projecttitle" : this.projecttitle,
                "startdatetime" : this.logForm.value.datetime,
                "finishdatetime" : "",
                "timespent" : "",
                "lognote" : this.logForm.value.lognote,
              });

    this.logsService.createLog(this.log[0]);

  	this.timerRunning = true;
  	
  	this.t = setInterval(()=> { 
  		this.add();
  	}, 1000);    
  }

  stopTimeLog() { 
    clearInterval(this.dateInterval);
    this.log = [];   
    this.logs = this.logsService.getAllLogs();
    this.logsService.logsChanged
        .subscribe(
          (logs: Logs[]) => {
            this.logs = logs;
        });

    this.logIndex = this.logs.map((log) => log.logid).indexOf(this.logForm.value.logid);

    this.logsService.updateLog(this.logIndex, this.logForm.value.datetime, this.logForm.value.timespent);

  	this.timerRunning = false;
  	this.time = "00:00:00";
    this.seconds = 0;
    this.minutes = 0; 
    this.hours = 0;
    clearInterval(this.t);

    this.logid = this.logForm.value.logid;
    this.dateInterval = setInterval(() => {
        this.date =  new Date();
     }, 1000);
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
  }


}
