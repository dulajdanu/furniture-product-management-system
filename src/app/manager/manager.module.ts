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
  NbProgressBarModule,
  NbCalendarModule,
  NbListModule
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
import { ReportsComponent } from './reports/reports.component';
import { InventoryUsageComponent } from './inventory-usage/inventory-usage.component';
import { OrderTypePredictionComponent } from './order-type-prediction/order-type-prediction.component';
import { RejectJobReportComponent } from './reject-job-report/reject-job-report.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { CalenderCustomDayCellComponentComponent } from './calender-custom-day-cell-component/calender-custom-day-cell-component.component';

@NgModule({
  declarations: [ManagerComponent, HomeComponent, OrderComponent, EstimateCalComponent, OngoingOrdersComponent, ReportsComponent, InventoryUsageComponent, OrderTypePredictionComponent, RejectJobReportComponent, AddStaffComponent, CalenderCustomDayCellComponentComponent],
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
    NgxDropzoneModule,
    NbCalendarModule,
    NbListModule


  ]
})
export class ManagerModule { }
