import { Subject } from 'rxjs/Subject';

import { Logs } from './logs.model';
export class ReportService {
	private logs: Logs[] = require('./logs.json');

	getUserLog(employeeid: string) {
    return this.logs.filter(u => u.employeeid === employeeid);
  }

  getProjectLogdetails(employeeid: string,projectcode: string) {
    // return this.logs.filter([u => u.employeeid === employeeid,
    // 						u => u.projectcode === projectcode]);
    return this.filter(this.logs, { employeeid: employeeid, projectcode: projectcode });
  }

  getUsersWorkedUnderProject(projectcode: string) {
   // console.log(this.logs.filter(u => u.projectcode === projectcode));
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