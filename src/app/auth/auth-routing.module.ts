import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path: '', component: NbAuthComponent, children: [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'sign-up',
      component: SignupComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
