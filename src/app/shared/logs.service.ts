import { Logs } from './logs.model';

export class LogsService { 
  private log: Logs[] = require('./logs.json');

  getRecentLogs(employeeid : string) {  
    return this.log.find(e => e.employeeid === employeeid); 
  }
}