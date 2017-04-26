import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ModalModule } from 'ng2-bootstrap/modal';

// DataTables Module
import { DataTablesModule } from 'angular-datatables';

import { UserAddComponent } from './user/user-add.component';
import { UserManageComponent } from './user/user-manage.component';
import { ProjectAddComponent } from './project/project-add.component';
import { ProjectManageComponent } from './project/project-manage.component';
import { LeaveManageComponent } from './leave/leave-manage.component';
import { TeammemberReportComponent } from './report/teammember-report.component';
import { SettingsComponent } from './settings/settings.component';
import { LeaveAddComponent } from './leave/leave-add.component';
import { AccountComponent } from './account/account.component';
import { AppsettingComponent } from './leave/appsetting.component';
import { ProjectUpdateComponent } from './project/project-update.component';
import { LeaveUpdateComponent } from './leave/leave-update.component';
import { UserUpdateComponent } from './user/user-update.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ProjectReportComponent } from './report/project-report.component';

@NgModule({
  imports: [ 
  	FormsModule,
  	AdminRoutingModule,
  	CommonModule,
	  ReactiveFormsModule,
    ChartsModule,
    DataTablesModule,
    ModalModule.forRoot()
  ],
  declarations: [ 
  	UserAddComponent,
  	UserManageComponent,
    ProjectAddComponent,
  	ProjectManageComponent,
  	LeaveManageComponent,
  	TeammemberReportComponent,
  	SettingsComponent,
  	SettingsComponent,
  	LeaveAddComponent,
  	AccountComponent,
  	AppsettingComponent,
    ProjectUpdateComponent,
    LeaveUpdateComponent,
    UserUpdateComponent,
    ProjectReportComponent
  ],
  providers: [
    ProjectUpdateComponent,
    LeaveUpdateComponent,
    UserUpdateComponent
  ]
})
export class AdminModule { }
