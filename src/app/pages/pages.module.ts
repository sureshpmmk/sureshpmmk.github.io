import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
//import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  imports: [ 
//  	FormsModule,
  	PagesRoutingModule 
  ],
  declarations: [
    P404Component,
    P500Component,
//    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ]
})
export class PagesModule { }
