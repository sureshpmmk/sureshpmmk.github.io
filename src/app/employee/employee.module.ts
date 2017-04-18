import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LogtimeComponent } from './logtime/logtime.component';
import { ReportComponent } from './report/report.component';
import { ProjectsComponent } from './projects/projects.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  imports: [ 
  	FormsModule,
  	EmployeeRoutingModule,
  	CommonModule,
	  ReactiveFormsModule
  ],
  declarations: [ 
  DashboardComponent, LogtimeComponent, ReportComponent, ProjectsComponent, AccountComponent],
  providers: [
  ]
})
export class EmployeeModule { }
