import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Logs } from './logs.model';

@Injectable()
export class LogsService { 
  logsChanged = new Subject<Logs[]>();
  logId;
  private logs: Logs[] = [];
  public user = JSON.parse(localStorage.getItem("user"));
  employeeId;

  constructor(private http: Http) {
    this.getLogsJson();
  }
  saveLogs(log){
      const headers = new Headers({ 'Content-Type' : 'application/json'});
      return this.http.post("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/user-logs",
      log,
      {headers: headers});
     
  }
 
  getLogsJson() {
   this.employeeId = this.user.employeeid;  
   this.http.get("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/user-logs?employee="+this.employeeId)
        .map(
          (response: Response) => {
            const resp = response.json();
            const logs = resp.Result;                 
            return logs;
          }
        )
        .subscribe(
          (logs: Logs[]) => {                 
            this.setLogs(logs);
          }
        );           
  }

  setLogs(logs: Logs[]) {
    this.logs = logs;
    this.logsChanged.next(this.logs.slice());    
  }

  getAllLogs() {  
    return this.logs; 
  }
  getUserLogs(employeeId){
    return this.http.get("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/user-logs?employee="+employeeId);
  }
  
  createLog(log: Logs,logId) {
      this.logs.unshift(log);
      this.logsChanged.next(this.logs.slice());
      const headers = new Headers({ 'Content-Type' : 'application/json'});
      return this.http.post("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/user-logs/"+logId,
      log); 
  }

  updateLog(logIndex:number, finishdatetime: string, timespent: string) {
  	// if(logIndex > -1) {
  	// 	this.logs[logIndex].finishDatetime = finishdatetime;
  	// 	this.logs[logIndex].timeSpent = timespent;
    // 	this.logsChanged.next(this.logs.slice());
  	// }
  }
}