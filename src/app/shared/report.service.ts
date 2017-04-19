import { Subject } from 'rxjs/Subject';

import { Logs } from './logs.model';
export class ReportService {
	private logs: Logs[] = require('./logs.json');

	getUserLog(employeeid: string) {
    return this.logs.filter(u => u.employeeid === employeeid);
  }

  getProjectLogdetails(employeeid: string,projectcode: string) {
    return this.logs.filter(u => u.employeeid === employeeid,
    						u => u.projectcode === projectcode);
  }

}