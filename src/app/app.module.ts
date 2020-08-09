/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbLayoutModule,
  NbActionsModule,
  NbContextMenuModule,
} from '@nebular/theme';
import { AngularFireModule, } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OngoingOrdersComponent } from './manager/ongoing-orders/ongoing-orders.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChartsModule } from 'ng2-charts';
import { MainPageComponent } from './main-page/main-page.component';


@NgModule({
  declarations: [AppComponent, MainPageComponent],
  providers: [
    { provide: BUCKET, useValue: 'furniture-webapp.appspot.com' }
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NbSidebarModule.forRoot(), //to create the sidebar
    NbMenuModule.forRoot(), //to shwo the menu icons in the side bar
    NbDatepickerModule.forRoot(), //to select the date
    NbEvaIconsModule, NgbModule,//to add icons
    NgxMaterialTimepickerModule,
    AngularFireStorageModule,
    Ng2SmartTableModule,
    NgxDropzoneModule,
    ChartsModule,
    NbLayoutModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,







  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
