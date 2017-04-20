import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { Logs } from '../../shared/logs.model';
import { ReportService } from '../../shared/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './teammember-report.component.html'
})
export class TeammemberReportComponent implements OnInit {
  @ViewChild('f') reportForm: NgForm;	
   
  users; 
  employename;	
  employeelog;
  projectName;
  totalTimeSpend = 0;
  flag_showhidedetails = 0;
  flag_chart = 0;
  chartViewVariable = "Chart View";
  employeeprojects;

  constructor(private userService: UserService,private reportService: ReportService) { }

  ngOnInit() {
  	this.users = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
          (users: User[]) => {
            this.users = users;
          }
        );
      this.employename = '';
  }

  onViewTeammemberprojectDetails(){
  	this.employeeprojects = this.reportService.getUserLog(this.reportForm.value.employename);  	
  }
  viewprojectLogdetailsforOneuser(employeeid,projectcode){

    this.projectName ="Project Name" + projectcode;
    this.flag_showhidedetails = 1;
    this.employeelog = this.reportService.getProjectLogdetails(employeeid,projectcode);     

  }
  goBack()
  {
    console.log(this.flag_showhidedetails);
    this.flag_showhidedetails = 0;
  }


    // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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

}
