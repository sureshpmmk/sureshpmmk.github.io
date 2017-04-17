import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAddComponent } from './user/user-add.component';
import { UserManageComponent } from './user/user-manage.component';
import { ProjectAddComponent } from './project/project-add.component';
import { ProjectManageComponent } from './project/project-manage.component';
import { LeaveManageComponent } from './leave/leave-manage.component';
import { ReportComponent } from './report/report.component';
import { SettingsComponent } from './settings/settings.component';
import { LeaveAddComponent } from './leave/leave-add.component';
import { AccountComponent } from './account/account.component';
import { AppsettingComponent } from './leave/appsetting.component';
import { ProjectUpdateComponent } from './project/project-update.component';

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
    path: 'update-project/:projectCode',
    component: ProjectUpdateComponent,
    data: {
      title: 'Update Project'
    }
  },
  {
    path: 'add-leave',
    component: LeaveAddComponent,
    data: {
      title: 'Add Leave'
    }
  },
  {
    path: 'manage-leave',
    component: LeaveManageComponent,
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
  },
   {
    path: 'account',
    component: AccountComponent,
    data: {
      title: 'Account'
    }
  },
  {
    path: 'app-setting',
    component: AppsettingComponent,
    data: {
      title: 'Add Holidays'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
