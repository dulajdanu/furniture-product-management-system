import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { UserRoutingModule } from '../user/user-routing.module';
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
  NbSelectModule,
  NbStepperModule,
  NbProgressBarModule
} from '@nebular/theme';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { OrderComponent } from './order/order.component';
import { EstimateCalComponent } from './estimate-cal/estimate-cal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OngoingOrdersComponent } from './ongoing-orders/ongoing-orders.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [ManagerComponent, HomeComponent, OrderComponent, EstimateCalComponent, OngoingOrdersComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
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
    NbSelectModule,
    Ng2SmartTableModule,
    NbStepperModule,
    NbProgressBarModule,
    NgxDropzoneModule


  ]
})
export class ManagerModule { }
