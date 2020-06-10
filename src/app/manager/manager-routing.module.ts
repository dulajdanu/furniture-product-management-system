import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { EstimateCalComponent } from './estimate-cal/estimate-cal.component';
import { OngoingOrdersComponent } from './ongoing-orders/ongoing-orders.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [{ path: '', redirectTo: '/manager/home', pathMatch: 'full' }, {
  path: 'home',
  component: HomeComponent
},
{
  path: 'order/:id',
  component: OrderComponent
},
{
  path: 'estimate-calculator',
  component: EstimateCalComponent
},
{
  path: 'ongoing-orders',
  component: OngoingOrdersComponent
},
{
  path: 'reports',
  component: ReportsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
