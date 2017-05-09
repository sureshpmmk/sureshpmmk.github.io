import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';

import { EmployeeRoutingModule } from './employee-routing.module';

// DataTables Module
import { DataTablesModule } from 'angular-datatables';

//import { EmployeeComponent } from '../employee/employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogtimeComponent } from './logtime/logtime.component';
import { ReportComponent } from './report/report.component';
import { ProjectsComponent } from './projects/projects.component';
import { AccountComponent } from './account/account.component';
import { TabsModule } from 'ng2-bootstrap/tabs';


@NgModule({
  imports: [ 
  	FormsModule,
  	EmployeeRoutingModule,
  	CommonModule,
	  ReactiveFormsModule,
    TabsModule,
    ChartsModule,
    DataTablesModule,
    HttpModule
  ],
  declarations: [ 
    DashboardComponent, 
    LogtimeComponent, 
    ReportComponent, 
    ProjectsComponent, 
    AccountComponent,
   // EmployeeComponent
  ],
  providers: [
  ]
})
export class EmployeeModule { }
