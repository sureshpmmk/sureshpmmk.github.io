import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { ProjectReportComponent } from './report/project-report.component';

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
    path: 'manage-employee',
    component: UserManageComponent,
    data: {
      title: 'Employees'
    }
  },
  {
    path: 'update-employee/:employeeId',
    component: UserUpdateComponent,
    data: {
      title: 'Update Employee'
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
    path: 'manage-projects',
    component: ProjectManageComponent,
    data: {
      title: 'Projects'
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
    path: 'manage-leaves',
    component: LeaveManageComponent,
    data: {
      title: 'Employee Leaves'
    }
  },
  {
    path: 'team-reports',
    component: TeammemberReportComponent,
    data: {
      title: 'Employee Reports'
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
      title: 'Holidays'
    }
  },
  {
    path: 'update-leaves/:leaveIndex',
    component: LeaveUpdateComponent,
    data: {
      title: 'Update Leave'
    }
  },
  {
    path: 'project-reports',
    component: ProjectReportComponent,
    data: {
      title: 'Project Reports'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
