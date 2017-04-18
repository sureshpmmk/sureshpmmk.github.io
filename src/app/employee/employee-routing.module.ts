import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LogtimeComponent } from './logtime/logtime.component';
import { ReportComponent } from './report/report.component';
import { ProjectsComponent } from './projects/projects.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'log-time',
    component: LogtimeComponent,
    data: {
      title: 'Log Your Time'
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
    path: 'projects',
    component: ProjectsComponent,
    data: {
      title: 'Projects'
    }
  },
  {
    path: 'account',
    component: AccountComponent,
    data: {
      title: 'My Account'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
