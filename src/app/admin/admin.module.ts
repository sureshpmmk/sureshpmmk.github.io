import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';

import { UserAddComponent } from './user/user-add.component';
import { UserManageComponent } from './user/user-manage.component';
import { ProjectComponent } from './project/project.component';
import { LeaveComponent } from './leave/leave.component';
import { ReportComponent } from './report/report.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  imports: [ 
  	FormsModule,
  	AdminRoutingModule,
  	CommonModule,
	ReactiveFormsModule
  ],
  declarations: [ 
  	UserAddComponent,
  	UserManageComponent,
  	ProjectComponent,
  	LeaveComponent,
  	ReportComponent,
  	SettingsComponent,
  	AccountComponent
  ]
})
export class AdminModule { }
