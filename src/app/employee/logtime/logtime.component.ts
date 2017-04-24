import { Component, OnInit, ViewChild } from '@angular/core';

import { Project } from '../../shared/project.model';
import { ProjectService } from '../../shared/project.service';
import { LogsService } from '../../shared/logs.service';
import { Logs } from '../../shared/logs.model';

@Component({
  templateUrl: './logtime.component.html'
})
export class LogtimeComponent implements OnInit {
  employee = JSON.parse(localStorage.getItem('user'));
  logs: Logs[] = [];

  constructor(private logsService: LogsService) {  }

  ngOnInit() {
    this.logs = this.logsService.getAllLogs();
    this.logsService.logsChanged
        .subscribe(
          (logs: Logs[]) => {
            this.logs = logs;
           // this.setLogArray(this.logs);
        });
  }
  
}
