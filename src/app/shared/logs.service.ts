import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Logs } from './logs.model';

@Injectable()
export class LogsService { 
  logsChanged = new Subject<Logs[]>();
  private logs: Logs[] = []; //require('./logs.json'); //

  constructor(private http: Http) {
    this.getLogsJson();
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

  getRecentLogs(employeeid : string) {
    return this.logs.find(e => e.employeeid === employeeid); 
  }
}