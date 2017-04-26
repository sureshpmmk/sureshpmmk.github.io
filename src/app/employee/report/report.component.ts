import { Component, OnInit } from '@angular/core';

import { LogsService } from '../../shared/logs.service';
import { Logs } from '../../shared/logs.model';

@Component({
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
  employee = JSON.parse(localStorage.getItem('user'));
  logid = 100;
  log;
  logs: Logs[] = [];
  logsbyProjects: Logs[] = [];
  logsProjectDetailed = [];
  projecttitle = '';
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

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    console.log(111);
  	this.logs = this.logsService.getAllLogs().filter(e => e.employeeid === this.employee.employeeid);
    this.logsService.logsChanged
        .subscribe(
          (logs: Logs[]) => {
            this.logs = logs.filter(e => e.employeeid === this.employee.employeeid);
            this.viewProjectChartLog();
        });

    
    this.viewProjectChartLog();
        
  }

  viewProjectChartLog() {

    this.lineChartLabels = this.getLineChartLabels(this.numberofdays);
   // this.lineChartData = 
    let checkedProjectCodes = [];

    for(let log of this.logs) {
    	if(checkedProjectCodes.indexOf(log.projectcode) === -1) {
    		checkedProjectCodes.push(log.projectcode);
    		this.lineChartData.push(this.getLineChartDatas(this.lineChartLabels, log.projectcode));
    	}    	
    }

    this.viewProjectLogFlag = false;
    this.viewProjectLogGridFlag = false;
    this.viewProjectLogChartFlag = true;
  }

  getLineChartLabels(numberofdays: number) {
    let today = new Date();
    let startdate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (numberofdays-1));
    let dates = this.getDatesArray(startdate, today);
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

  getLineChartDatas(datesArray: Array<string>, projectCode: string) {
    let newDataArray = [];
    let dataArray = this.getProjectLogDetailsByDate(datesArray,projectCode);

    for(let date of datesArray) {
      if(date in dataArray) {
        let timespentArr = dataArray[date].split(':');
        let hours = Math.round((parseInt(timespentArr[0]) + (parseInt(timespentArr[1]) / 60)) * 10)/10;
        newDataArray.push(hours);
      } else {
        newDataArray.push(0);
      }
    }

    return {data: newDataArray, label: dataArray['projecttitle']};
  }

  getProjectLogDetailsByDate(datesArray: Array<string>, projectcode: string) {
    this.logsProjectDetailed = [];
    let logsProjectArray = this.logs.filter(e => e.projectcode === projectcode);
    
    this.logsProjectDetailed['projectcode'] = projectcode;
    this.logsProjectDetailed['projecttitle'] = logsProjectArray[0].projecttitle;
    this.logsProjectDetailed['totaltimespent'] = "00:00:00";

    let data = this.setLogArrayByDate(logsProjectArray);
    for(let logsdetail of data) {
      this.logsProjectDetailed[logsdetail.date] = logsdetail.timespent;

      let timespentArr = this.logsProjectDetailed['totaltimespent'].split(':');
      let valuetimespentArr = logsdetail.timespent.split(':');

      let timeSpentHours   = parseInt(timespentArr[0]) + parseInt(valuetimespentArr[0]);
      let timeSpentMinutes = parseInt(timespentArr[1]) + parseInt(valuetimespentArr[1]);
      let timeSpentSeconds = parseInt(timespentArr[2]) + parseInt(valuetimespentArr[2])

      this.logsProjectDetailed['totaltimespent'] = timeSpentHours + ':' + timeSpentMinutes + ':' + timeSpentSeconds;
    }
    return this.logsProjectDetailed;
  }

  setLogArrayByDate(logsArray) {
    let logsArr = [];
    logsArray.reduce(function (res, value) {
        if (!res[value.startdatetime.split(' ')[0]]) {
            let dateArr = value.startdatetime.split(' ')[0].split('-');
            res[value.startdatetime.split(' ')[0]] = {
                "date": dateArr[2] + '/' + dateArr[1],
                "timespent" : "00:00:00"
            };
            logsArr.push(res[value.startdatetime.split(' ')[0]]);
        }

        let timespentArr = res[value.startdatetime.split(' ')[0]].timespent.split(':');
        let valuetimespentArr = value.timespent.split(':');

        let timeSpentHours   = parseInt(timespentArr[0]) + parseInt(valuetimespentArr[0]);
        let timeSpentMinutes = parseInt(timespentArr[1]) + parseInt(valuetimespentArr[1]);
        let timeSpentSeconds = parseInt(timespentArr[2]) + parseInt(valuetimespentArr[2])

        res[value.startdatetime.split(' ')[0]].timespent = timeSpentHours + ':' + timeSpentMinutes + ':' + timeSpentSeconds;

       return res;

    }, {});

    return logsArr;
  }

}
