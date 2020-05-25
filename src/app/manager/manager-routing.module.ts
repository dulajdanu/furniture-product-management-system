import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { EstimateCalComponent } from './estimate-cal/estimate-cal.component';

const routes: Routes = [{ path: '', component: ManagerComponent }, {
  path: 'home',
  component: HomeComponent
},
{
  path: 'order',
  component: OrderComponent
},
{
  path: 'estimate-calculator',
  component: EstimateCalComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
