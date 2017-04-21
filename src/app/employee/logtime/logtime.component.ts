import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';
import { LogsService } from '../../shared/logs.service';
import { Logs } from '../../shared/logs.model';

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
  logid = 100;
  log;
  logs: Logs[] = [];
  logsbyProjects: Logs[] = [];
  logsProjectDetailed = [];
  projecttitle = '';
  logIndex;
  dateInterval;
  viewProjectLogFlag = true;
  viewProjectLogGridFlag = false;
  viewProjectLogChartFlag = false;
  numberofdays = 7;
  // lineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private projectService: ProjectService, private logsService: LogsService) {  }

  ngOnInit() {
    this.logs = this.logsService.getAllLogs();
    this.logsService.logsChanged
        .subscribe(
          (logs: Logs[]) => {
            this.logs = logs;
            this.setLogArray(this.logs);
        });

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

  setLogArray(logsArray) {
    let logsArr = [];
    logsArray.reduce(function (res, value) {
        if (!res[value.projectcode]) {
            res[value.projectcode] = {
                "logid" : value.logid,
                "employeeid" : value.employeeid,
                "employeename" : value.employeename,
                "projectcode" :  value.projectcode,
                "projecttitle" : value.projecttitle,
                "startdatetime": value.startdatetime,
                "finishdatetime" : value.finishdatetime,
                "timespent" : "00:00:00",
                "lognote"   : value.lognote
            };
            logsArr.push(res[value.projectcode]);
        }

        let timespentArr = res[value.projectcode].timespent.split(':');
        let valuetimespentArr = value.timespent.split(':');

        let timeSpentHours   = parseInt(timespentArr[0]) + parseInt(valuetimespentArr[0]);
        let timeSpentMinutes = parseInt(timespentArr[1]) + parseInt(valuetimespentArr[1]);
        let timeSpentSeconds = parseInt(timespentArr[2]) + parseInt(valuetimespentArr[2])

        res[value.projectcode].timespent = timeSpentHours + ':' + timeSpentMinutes + ':' + timeSpentSeconds;

       return res;

    }, {});

    this.logsbyProjects = logsArr;
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

  viewProjectGridLog(projectcode: string) {
    this.getProjectLogDetails(projectcode);

    this.viewProjectLogFlag = false;
    this.viewProjectLogGridFlag = true;
    this.viewProjectLogChartFlag = false;
  }

  viewProjectChartLog(projectcode: string) {
    this.getProjectLogDetails(projectcode);

    this.lineChartData = [{data: [65, 59, 80, 81, 100, 55, 40], label: 'Project'}];
    // /this.lineChartLabels = 
    this.getLineChartLabels(this.numberofdays);//['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    this.viewProjectLogFlag = false;
    this.viewProjectLogGridFlag = false;
    this.viewProjectLogChartFlag = true;
  }

  getProjectLogDetails(projectcode: string) {
    this.logsProjectDetailed = [];
    let logsProjectArray = this.logs.filter(e => e.projectcode === projectcode); 
    
    this.logsProjectDetailed['projectcode'] = projectcode;
    this.logsProjectDetailed['projecttitle'] = "";
    this.logsProjectDetailed['totaltimespent'] = "00:00:00";
    for(let logsProject of logsProjectArray) {

      let timespentArr = this.logsProjectDetailed['totaltimespent'].split(':');
      let valuetimespentArr = logsProject.timespent.split(':');

      let timeSpentHours   = parseInt(timespentArr[0]) + parseInt(valuetimespentArr[0]);
      let timeSpentMinutes = parseInt(timespentArr[1]) + parseInt(valuetimespentArr[1]);
      let timeSpentSeconds = parseInt(timespentArr[2]) + parseInt(valuetimespentArr[2])

      this.logsProjectDetailed['projecttitle'] = logsProject.projecttitle;
      this.logsProjectDetailed['totaltimespent'] = timeSpentHours + ':' + timeSpentMinutes + ':' + timeSpentSeconds;

      this.logsProjectDetailed.push({ "startdatetime" : logsProject.startdatetime,
                                      "finishdatetime" : logsProject.finishdatetime,
                                      "timespent" : logsProject.timespent,
                                      "lognote" : logsProject.lognote
                                   });
    }
  }

  getLineChartLabels(numberofdays: number) {
    let today = new Date();
    let startdate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - numberofdays);
    let dates = this.getDatesArray(startdate, today);
    console.log(dates);
  }

  getDatesArray(startdate, enddate) {
    let year = startdate.getFullYear();
    let month = startdate.getMonth();
    let day = startdate.getDate();
    let dates = [startdate];

    while(dates[dates.length-1] < enddate) {
      //let date = new Date(year, month, ++day);
      dates.push(new Date(year, month, ++day));
    }

    return dates;
  }
  
}
