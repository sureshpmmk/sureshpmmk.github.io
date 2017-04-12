import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';

import { UserAddComponent } from './user/user-add.component';
import { UserManageComponent } from './user/user-manage.component';
import { ProjectAddComponent } from './project/project-add.component';
import { ProjectManageComponent } from './project/project-manage.component';
import { LeaveComponent } from './leave/leave.component';
import { ReportComponent } from './report/report.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [ 
  	FormsModule,
  	AdminRoutingModule,
  	CommonModule
  ],
  declarations: [ 
  	UserAddComponent,
  	UserManageComponent,
    ProjectAddComponent,
  	ProjectManageComponent,
  	LeaveComponent,
  	ReportComponent,
  	SettingsComponent
  ]
})
export class AdminModule { }
