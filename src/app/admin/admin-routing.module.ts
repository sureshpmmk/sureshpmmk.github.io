import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAddComponent } from './user/user-add.component';
import { UserManageComponent } from './user/user-manage.component';
import { ProjectAddComponent } from './project/project-add.component';
import { ProjectManageComponent } from './project/project-manage.component';
import { LeaveComponent } from './leave/leave.component';
import { ReportComponent } from './report/report.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: UserManageComponent,
    data: {
      title: 'User'
    }
  },
  {
    path: 'add-user',
    component: UserAddComponent,
    data: {
      title: 'Add User'
    }
  },
  {
    path: 'manage-user',
    component: UserManageComponent,
    data: {
      title: 'Manage User'
    }
  },
  {
    path: 'add-project',
    component: ProjectAddComponent,
    data: {
      title: 'Add Project'
    }
  },
  {
    path: 'manage-project',
    component: ProjectManageComponent,
    data: {
      title: 'Manage Project'
    }
  },
  {
    path: 'add-leave',
    component: LeaveComponent,
    data: {
      title: 'Add Leave'
    }
  },
  {
    path: 'manage-leave',
    component: LeaveComponent,
    data: {
      title: 'Manage Leave'
    }
  },
  {
    path: 'reports',
    component: ReportComponent,
    data: {
      title: 'Reports'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'Settings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
