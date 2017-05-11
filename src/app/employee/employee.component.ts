import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http , Response } from '@angular/http';

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
  projectTitle = '';
  logIndex;
  dateInterval;
  lognote;
  today = new Date();
  logId;

  constructor(private projectService: ProjectService, private logsService: LogsService,private http: Http) {  }

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
    this.lognote = (localStorage.getItem('logNote')) ? localStorage.getItem('logNote') : '';

    this.dateInterval = setInterval(() => {
        this.date =  new Date();
     }, 1000);

    if(this.timerRunning === true) {
      let currentLog = JSON.parse(localStorage.getItem('log'));
      let startdatetime = new Date(currentLog.startDatetime);
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

    let selectedProject = this.projects.find(p => p.projectCode === this.logForm.value.project);
    this.projectTitle = selectedProject.projectTitle;
    let log = {        
                "employeeId" : this.logForm.value.employeeId,
                "employeeName" : this.logForm.value.employeeName,
                "projectCode" : this.logForm.value.project,
                "projectTitle" : this.projectTitle,
                "startDatetime" : this.logForm.value.dateTime,
                "finishDatetime" : "",
                "timeSpent" : "",
                "logNote" : this.logForm.value.lognote
              };
    this.logsService.saveLogs(log)
    .subscribe(
      (response: Response) => {
        const resp = response.json();
        localStorage.setItem("logId", resp.id);
        log['logId'] = resp.id;
        
      },
      (error)  => console.log(error)
    ); 
    localStorage.setItem("log", JSON.stringify(log));
    localStorage.setItem("project", this.logForm.value.project);
    localStorage.setItem("logNote", this.logForm.value.lognote);
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
    let startDatetime = new Date(currentLog.startDatetime);
    let finishDatetime = new Date(this.logForm.value.dateTime);
    let diffs = (finishDatetime.getTime() - startDatetime.getTime());
    let timeSpent = this.timespent(diffs);
    currentLog.finishDatetime = this.logForm.value.dateTime;
    currentLog.timeSpent = timeSpent;
    currentLog.logNote = this.logForm.value.lognote;
    this.logId = localStorage.getItem('logId'); 

    this.logsService.createLog(currentLog,this.logId).subscribe(
      (response: Response) => console.log(response),
      (error)  => console.log(error)
    );
    
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
    localStorage.removeItem("logNote");
    localStorage.removeItem("timer");
    localStorage.removeItem("seconds");
    localStorage.removeItem("minutes");
    localStorage.removeItem("hours");
    localStorage.removeItem("logId");

    this.logId = this.logForm.value.logId;
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
