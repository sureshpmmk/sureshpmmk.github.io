import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';

import { UserAddComponent } from './user/user-add.component';
import { UserManageComponent } from './user/user-manage.component';
import { ProjectComponent } from './project/project.component';
import { LeaveManageComponent } from './leave/leave-manage.component';
import { ReportComponent } from './report/report.component';
import { SettingsComponent } from './settings/settings.component';
import { LeaveAddComponent } from './leave/leave-add.component';

@NgModule({
  imports: [ 
  	FormsModule,
  	AdminRoutingModule,
  	CommonModule
  ],
  declarations: [ 
  	UserAddComponent,
  	UserManageComponent,
  	ProjectComponent,
  	LeaveManageComponent,
  	ReportComponent,
  	SettingsComponent,
  	LeaveAddComponent
  ]
})
export class AdminModule { }
