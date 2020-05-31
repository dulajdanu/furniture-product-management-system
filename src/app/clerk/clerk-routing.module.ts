import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClerkComponent } from './clerk.component';
import { HomeComponent } from '../clerk/home/home.component';
import { OrderComponent } from './order/order.component';
import { ConfirmorderComponent } from './confirmorder/confirmorder.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OngoingOrdersComponent } from './ongoing-orders/ongoing-orders.component';
import { AddStockComponent } from './inventory/add-stock/add-stock.component';
import { RemoveStockComponent } from './inventory/remove-stock/remove-stock.component';

const routes: Routes = [{ path: '', redirectTo: '/clerk/home', pathMatch: 'full' }, {
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
},
{
  path: 'inventory',
  component: InventoryComponent
},
{
  path: 'ongoing-orders',
  component: OngoingOrdersComponent
},
{
  path: 'add-stock',
  component: AddStockComponent
},
{
  path: 'remove-stock',
  component: RemoveStockComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
