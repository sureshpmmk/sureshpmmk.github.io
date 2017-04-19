import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';
import { Logs } from '../../shared/logs.model';
import { ReportService } from '../../shared/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
  @ViewChild('f') reportForm: NgForm;	
   
  users; 
  employename = "--Select--";	
  employeelog;
  projectName;
  totalTimeSpend = 0;
  flag_showhidedetails = 0;

  constructor(private userService: UserService,private reportService: ReportService) { }

  ngOnInit() {
  	this.users = this.userService.getUsers();
  }

  onViewTeammemberprojectDetails(){
  	this.employeelog = this.reportService.getUserLog(this.reportForm.value.employename);  	
  }
  viewprojectLogdetailsforOneuser(employeeid,projectcode){

    this.projectName ="Project Name" + projectcode;
    this.flag_showhidedetails = 1;
    this.employeelog = this.reportService.getProjectLogdetails(employeeid,projectcode);     

  }

}
