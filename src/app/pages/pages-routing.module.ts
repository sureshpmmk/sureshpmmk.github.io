import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { RegisterComponent } from './register.component';
import { ForgotPasswordComponent } from './forgot-password.component';
// import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Example Pages'
    },
    children: [
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500'
        }
      },      
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },
      // {
      //   path: 'login',
      //   component: LoginComponent,
      //   data: {
      //     title: 'Login'
      //   }
      // }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
