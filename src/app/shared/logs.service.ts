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

  constructor(private http: Http) {
    this.getLogsJson();
  }
  saveLogs(logs){

      const headers = new Headers({ 'Content-Type' : 'application/json'});
      return this.http.post("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/user-logs",
      logs,
      {headers: headers});
  }

  getLogsJson() {
    this.http.get("./src/app/shared/logs.json")
             .map(
                (response: Response) => {
                  const logs: Logs[] = response.json();
                  for(let log of logs) {
                    if(!log) {
                      console.log(log);
                    }
                  }
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
    return this.logs.slice(); 
  }
  getUserLogs(employeeId){
    return this.http.get("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/user-logs?employee="+employeeId);
  }
  
  createLog(log,logId) {  
      const headers = new Headers({ 'Content-Type' : 'application/json'});
      return this.http.post("https://pni590047g.execute-api.eu-west-1.amazonaws.com/beta/user-logs/"+logId,
      log);

  	
  }

  updateLog(logIndex:number, finishdatetime: string, timespent: string) {
  	if(logIndex > -1) {
  		this.logs[logIndex].finishdatetime = finishdatetime;
  		this.logs[logIndex].timespent = timespent;
    	this.logsChanged.next(this.logs.slice());
  	}
  }
}