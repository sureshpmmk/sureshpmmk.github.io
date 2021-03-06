import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { EmployeeLayoutComponent } from './layouts/employee-layout.component';

//services
import { AuthenticationService } from './shared/authentication.service';
import { UserService } from './shared/user.service';
import { ProjectService } from './shared/project.service';
import { LeaveService } from './shared/leave.service';
import { HolidayService } from './shared/holiday.service';
import { ReportService } from './shared/report.service';
import { LogsService } from './shared/logs.service';
import { EmployeeComponent } from './employee/employee.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    EmployeeLayoutComponent,
    EmployeeComponent
  ],
  providers: [{
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthenticationService,
    UserService,
    ProjectService,
    LeaveService,
    HolidayService,
    ReportService,
    LogsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
