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

	getUserLog(employeeId: string) {
    return this.logs.filter(u => u.employeeId === employeeId);
  }

  getProjectLogdetails(employeeId: string, projectcode: string) {
    // return this.logs.filter([u => u.employeeid === employeeid,
    // 						u => u.projectcode === projectcode]);
    return this.filter(this.logs, { employeeId: employeeId, projectcode: projectcode });
  }

  getUsersWorkedUnderProject(projectCode: string) {
    return this.logs.filter(u => u.projectCode === projectCode);
  }  

  filter(arr, criteria) {
    return arr.filter(function(obj) {
      return Object.keys(criteria).every(function(c) {
        return obj[c] == criteria[c];
      });
    });
  }
}