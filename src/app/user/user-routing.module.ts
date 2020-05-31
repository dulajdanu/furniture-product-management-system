import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { HomeComponent } from '../user/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { OngoingOrdersComponent } from './ongoing-orders/ongoing-orders.component';

const routes: Routes = [{ path: '', redirectTo: '/user/home', pathMatch: 'full' }, {
  path: "home",
  component: HomeComponent
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'ongoing-orders',
  component: OngoingOrdersComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
