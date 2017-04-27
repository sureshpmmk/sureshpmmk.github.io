import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Logs } from './logs.model';
import { LogsService } from './logs.service';

@Injectable()
export class ReportService {
	private logs: Logs[] = [];

  constructor(private logsService: LogsService) {
    this.logs = this.logsService.getAllLogs();
    this.logsService.logsChanged
      .subscribe(
          (logs: Logs[]) => {
            this.logs = logs;
          }
        );
  }

	getUserLog(employeeid: string) {
    return this.logs.filter(u => u.employeeid === employeeid);
  }

  getProjectLogdetails(employeeid: string, projectcode: string) {
    // return this.logs.filter([u => u.employeeid === employeeid,
    // 						u => u.projectcode === projectcode]);
    return this.filter(this.logs, { employeeid: employeeid, projectcode: projectcode });
  }

  getUsersWorkedUnderProject(projectcode: string) {
    return this.logs.filter(u => u.projectcode === projectcode);
  }  

  filter(arr, criteria) {
    return arr.filter(function(obj) {
      return Object.keys(criteria).every(function(c) {
        return obj[c] == criteria[c];
      });
    });
  }
}