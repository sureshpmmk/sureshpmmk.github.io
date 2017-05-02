import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';
import { Logs } from '../../shared/logs.model';
import { ReportService } from '../../shared/report.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['../../../assets/css/custom.css']  
})
export class ProjectReportComponent implements OnInit {
  @ViewChild('f') reportForm: NgForm;	
  projects: Project[] = [];
  projectname;
  totalTimeSpend = 0;
  flag_showhidedetails = 0;
  flag_chart = 0;
  chartViewVariable = "Chart View";
  employename;	
  employeelog;
  userName;
  employerdetails;
  listHeading;
  // lineChart
  lineChartData: Array<any> = [ {data: [], label: ' '}];
  lineChartLabels: Array<any> = [];
  lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  lineChartColours: Array<any> = [
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
  lineChartLegend: boolean = true;
  lineChartType: string = 'line';

  constructor(private projectService: ProjectService,private reportService: ReportService) { }

  ngOnInit() {
  	this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged
        .subscribe(
          (projects: Project[]) => {
            this.projects = projects;
        });
  	this.projectname = '';
  }

  onViewTeammemberDetails(event: Event) {
    event.preventDefault();
    if(this.reportForm.value.projectfromdate != "" && this.reportForm.value.projecttodate != ""){
      this.listHeading = "Report of "+ this.reportForm.value.projectname + " for the period " + 
    this.reportForm.value.projectfromdate+ " to" +this.reportForm.value.projecttodate;
    }
    else{
      this.listHeading = "Report of "+ this.reportForm.value.projectname;
    }
  	this.employerdetails = this.reportService.getUsersWorkedUnderProject(this.reportForm.value.projectname);  
    this.lineChartLabels = this.getLineChartLabels(this.reportForm.value.projectfromdate, this.reportForm.value.projecttodate);
    this.lineChartData = this.viewProjectChartLog(this.lineChartLabels, this.employerdetails);
  }

  viewUserwisedetails(employeeid,projectcode,employename) {
    this.userName ="Name : " + employename;
    this.flag_showhidedetails = 1;
    this.employeelog = this.reportService.getProjectLogdetails(employeeid,projectcode);
  }

  goBack() {
    this.flag_showhidedetails = 0;
  }

  toggleLineChart()
  {    
    if(this.flag_chart === 0){
      this.flag_chart = 1;
      this.chartViewVariable = "Grid View";
    }
    else{
      this.flag_chart = 0;
      this.chartViewVariable = "Chart View";
    }
  }

  viewProjectChartLog(lineChartLabels: Array<any>, employerdetails: Array<any>) {    
    let lineChartDataArr = [];

    if(employerdetails.length > 0) {
      let checkedEmployeesIds = [];
      for(let ed of employerdetails) {
        if(checkedEmployeesIds.indexOf(ed.employeeid) === -1) {
          checkedEmployeesIds.push(ed.employeeid);
          let employeelogArr = this.reportService.getProjectLogdetails(ed.employeeid, ed.projectcode);
          lineChartDataArr.push(this.getLineChartDatas(lineChartLabels, employeelogArr, ed.employeename));
        }      
      }
    }
    return lineChartDataArr;
  }

  getLineChartLabels(sdate, edate) {
    let startdate = new Date(sdate);
    let enddate = new Date(edate);
    let dates = this.getDatesArray(startdate, enddate);
    return dates;
  }

  getDatesArray(startdate, enddate) {
    let year = startdate.getFullYear();
    let month = startdate.getMonth();
    let day = startdate.getDate();
    let dates = [];
    let getDay;
    let getMonth;
    let currentdate = startdate;

    while(currentdate < enddate) {
      getDay = (currentdate.getDate() < 10) ? ('0'+ currentdate.getDate()) : currentdate.getDate();
      getMonth = (currentdate.getMonth() < 9) ? ('0'+ (currentdate.getMonth()+1)) : currentdate.getMonth();
      dates.push(getDay + '/' + getMonth);

      currentdate = new Date(year, month, ++day);
    }
    return dates;
  }

  getLineChartDatas(datesArray: Array<string>, logsProjectArray:  Array<any>, employeename: string) {
    let newDataArray = [];
    let dataArray = this.getProjectLogDetailsByDate(datesArray, logsProjectArray);

    for(let date of datesArray) {
      if(date in dataArray) {
        let timespentArr = dataArray[date].split(':');
        let hours = Math.round((parseInt(timespentArr[0]) + (parseInt(timespentArr[1]) / 60)) * 10)/10;
        newDataArray.push(hours);
      } else {
        newDataArray.push(0);
      }
    }

    return {data: newDataArray, label: employeename};
  }

  getProjectLogDetailsByDate(datesArray: Array<string>, logsProjectArray:  Array<any>) {
    let logsProjectDetailed = [];

    logsProjectDetailed['employeeid'] = logsProjectArray[0].employeeid;
    logsProjectDetailed['employeename'] = logsProjectArray[0].employeename;
    logsProjectDetailed['totaltimespent'] = "00:00:00";

    let data = this.setLogArrayByDate(logsProjectArray);
    for(let logsdetail of data) {
      logsProjectDetailed[logsdetail.date] = logsdetail.timespent;

      let timespentArr = logsProjectDetailed['totaltimespent'].split(':');
      let valuetimespentArr = logsdetail.timespent.split(':');

      let timeSpentHours   = parseInt(timespentArr[0]) + parseInt(valuetimespentArr[0]);
      let timeSpentMinutes = parseInt(timespentArr[1]) + parseInt(valuetimespentArr[1]);
      let timeSpentSeconds = parseInt(timespentArr[2]) + parseInt(valuetimespentArr[2])

      logsProjectDetailed['totaltimespent'] = timeSpentHours + ':' + timeSpentMinutes + ':' + timeSpentSeconds;
    }
    return logsProjectDetailed;
  }

  setLogArrayByDate(logsArray) {
    let logsArr = [];
    logsArray.reduce(function (res, value) {
        if (!res[value.startdatetime.split(' ')[0]]) {
            let dateArr = value.startdatetime.split(' ')[0].split('-');
            res[value.startdatetime.split(' ')[0]] = {
                "date": dateArr[2] + '/' + dateArr[1],
                "timespent" : value.timespent //"00:00:00"
            };
            logsArr.push(res[value.startdatetime.split(' ')[0]]);
        }

        //let timespentArr = res[value.startdatetime.split(' ')[0]].timespent.split(':');
        //let valuetimespentArr = value.timespent.split(':');

        //let timeSpentHours   = parseInt(timespentArr[0]) + parseInt(valuetimespentArr[0]);
        //let timeSpentMinutes = parseInt(timespentArr[1]) + parseInt(valuetimespentArr[1]);
        //let timeSpentSeconds = parseInt(timespentArr[2]) + parseInt(valuetimespentArr[2])

       // res[value.startdatetime.split(' ')[0]].timespent = timeSpentHours + ':' + timeSpentMinutes + ':' + timeSpentSeconds;

       return res;

    }, {});

    return logsArr;
  }

}
