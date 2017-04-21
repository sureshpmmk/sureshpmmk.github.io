import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Logs } from '../../shared/logs.model';
import { LogsService } from '../../shared/logs.service'; 

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
 logs: Logs[] = [];
 recentLogs: Logs[]=[];
  date;
  public logsArray= [];
  constructor(private logsService: LogsService, private router: Router){}
  public loggedUser = localStorage.getItem("username");
  public user = JSON.parse(localStorage.getItem("user"));
  
  ngOnInit() {
    this.date = new Date();
    this.logs = this.logsService.getAllLogs();
    this.logsService.logsChanged.subscribe(
      (logs: Logs[]) => {
            this.logs = logs;
            this.recentLogs = this.getRecentLogs(this.user.employeeid);
          }
        );
    
    //this.logs = this.logsService.getRecentLogs(this.user.employeeid);  
   
    if(this.loggedUser == null)
    {
    	 this.router.navigate(['pages/login']);
    }
  }
 getRecentLogs(employeeid : string) {
   
    //return this.logs.slice();
    return this.logs.filter(e => e.employeeid === employeeid); 
  }
}
