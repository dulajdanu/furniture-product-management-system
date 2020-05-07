import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClerkComponent } from './clerk.component';
import { HomeComponent } from '../clerk/home/home.component';
import { OrderComponent } from './order/order.component';
import { ConfirmorderComponent } from './confirmorder/confirmorder.component';

const routes: Routes = [{ path: '', component: ClerkComponent }, {
  path: 'home',
  component: HomeComponent
},
{
  path: 'order/:id',
  component: OrderComponent
},
{
  path: 'order/:id/confirmOrder',
  component: ConfirmorderComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
