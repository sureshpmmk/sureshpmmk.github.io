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
  projectsAll: Project[] = [];
  projects: Project[] = [];
  project;
  timerRunning = (localStorage.getItem('timerRunning') === 'true') ? true : false;
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
  lognote;

  constructor(private projectService: ProjectService, private logsService: LogsService) {  }

  ngOnInit() {
  	this.projectsAll = this.projectService.getProjects();
    this.projects = this.getProjectsByEmployee(this.projectsAll);
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projectsAll = projects;
            this.projects = this.getProjectsByEmployee(this.projectsAll);
        });

  	this.project = (localStorage.getItem('project')) ? localStorage.getItem('project') : '';
    this.lognote = (localStorage.getItem('lognote')) ? localStorage.getItem('lognote') : '';

    this.dateInterval = setInterval(() => {
        this.date =  new Date();
     }, 1000);

    if(this.timerRunning === true) {
      let currentLog = JSON.parse(localStorage.getItem('log'));
      let startdatetime = new Date(currentLog.startdatetime);
      let finishdatetime = new Date();
      let diffs = (finishdatetime.getTime() - startdatetime.getTime());
      this.timerTime(diffs);

      this.t = setInterval(()=> { 
        this.add();
      }, 1000); 

    } else {
      this.time = "00:00:00";
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
    }
  }

  getProjectsByEmployee(projectsAll) {
    let employeeProjects = [];
    for(let proj of projectsAll) {
      for(let member of proj.teammembers) {     
        if(member['id'] === this.employee.employeeid) {
          employeeProjects.push(proj);
        }
      }
    }

    return employeeProjects;
  }

  startTimeLog() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.log = [];
    this.logid++;

    this.projectsAll = this.projectService.getProjects();
    this.projects = this.getProjectsByEmployee(this.projectsAll);
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projectsAll = projects;
            this.projects = this.getProjectsByEmployee(this.projectsAll);
        });

    this.timerRunning = true;    
    this.t = setInterval(()=> { 
      this.add();
    }, 1000);  

    let selectedProject = this.projects.find(p => p.projectcode === this.logForm.value.project);
    this.projecttitle = selectedProject.projecttitle;
    let log = {
                "logid" : this.logid,
                "employeeid" : this.logForm.value.employeeid,
                "employeename" : this.logForm.value.employeename,
                "projectcode" : this.logForm.value.project,
                "projecttitle" : this.projecttitle,
                "startdatetime" : this.logForm.value.datetime,
                "finishdatetime" : "",
                "timespent" : "",
                "lognote" : this.logForm.value.lognote,
              };

    localStorage.setItem("log", JSON.stringify(log));
    localStorage.setItem("project", this.logForm.value.project);
    localStorage.setItem("lognote", this.logForm.value.lognote);
    localStorage.setItem("timerRunning", 'true');
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

    //this.logIndex = this.logs.map((log) => log.logid).indexOf(this.logForm.value.logid);
    let currentLog = JSON.parse(localStorage.getItem('log'));

    let startdatetime = new Date(currentLog.startdatetime);
    let finishdatetime = new Date(this.logForm.value.datetime);
    let diffs = (finishdatetime.getTime() - startdatetime.getTime());
    let timespent = this.timespent(diffs);
    currentLog.finishdatetime = this.logForm.value.datetime;
    currentLog.timespent = timespent;

    this.logsService.createLog(currentLog);

    //this.logsService.updateLog(this.logIndex, this.logForm.value.datetime, this.logForm.value.timespent);

  	this.timerRunning = false;
  	this.time = "00:00:00";
    this.seconds = 0;
    this.minutes = 0; 
    this.hours = 0;
    clearInterval(this.t);    

    localStorage.removeItem("log");
    localStorage.removeItem("timerRunning");
    localStorage.removeItem("project");
    localStorage.removeItem("lognote");
    localStorage.removeItem("timer");
    localStorage.removeItem("seconds");
    localStorage.removeItem("minutes");
    localStorage.removeItem("hours");

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

  timespent(timediff) {
    let milliseconds = timediff % 1000;
    timediff = (timediff - milliseconds) / 1000;
    let seconds = timediff % 60;
    timediff = (timediff - seconds) / 60;
    let minutes = timediff % 60;
    let hours = (timediff - minutes) / 60;
    let timespent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    return timespent;  
  }

  timerTime(timediff) {
    let milliseconds = timediff % 1000;
    timediff = (timediff - milliseconds) / 1000;
    this.seconds = timediff % 60;
    timediff = (timediff - this.seconds) / 60;
    this.minutes = timediff % 60;
    this.hours = (timediff - this.minutes) / 60;
  }
}
