import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logs } from '../../shared/logs.model';
import { LogsService } from '../../shared/logs.service'; 

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
 //logs: Logs[] = [];
  private logs;
  constructor(private logsService: LogsService, private router: Router){}
  public loggedUser = localStorage.getItem("username");
  public user = JSON.parse(localStorage.getItem("user"));
  
  ngOnInit() {
    this.logs = this.logsService.getRecentLogs(this.user.employeeid);  
    console.log(this.logs);
    if(this.loggedUser == null)
    {
    	 this.router.navigate(['pages/login']);
    }
  }

}
