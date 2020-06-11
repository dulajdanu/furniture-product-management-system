import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';
import { ClerkComponent } from './clerk.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbToastrModule,
  NbRadioModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbUserModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbPopoverModule,
  NbDialogModule,
  NbSelectModule
} from '@nebular/theme';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ConfirmorderComponent } from './confirmorder/confirmorder.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { InventoryComponent } from './inventory/inventory.component';
import { OngoingOrdersComponent } from './ongoing-orders/ongoing-orders.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddStockComponent } from './inventory/add-stock/add-stock.component';
import { RemoveStockComponent } from './inventory/remove-stock/remove-stock.component';


@NgModule({
  declarations: [ClerkComponent, HomeComponent, OrderComponent, ConfirmorderComponent, InventoryComponent, OngoingOrdersComponent, AddStockComponent, RemoveStockComponent],
  imports: [
    CommonModule,
    ClerkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbToastrModule,
    NbRadioModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbUserModule,
    NbCardModule,
    NbDatepickerModule,
    NbIconModule,
    NbPopoverModule,
    NgxMaterialTimepickerModule,
    Ng2SmartTableModule,

    NbSelectModule
  ]
})
export class ClerkModule { }
