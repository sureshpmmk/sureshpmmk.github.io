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

  constructor(private userService: UserService,private reportService: ReportService) { }

  ngOnInit() {
  	this.users = this.userService.getUsers();
  }

  onViewTeammemberprojectDetails(){
  	this.employeelog = this.reportService.getUserLog(this.reportForm.value.employename);
  	console.log(this.employeelog);
  }

}
