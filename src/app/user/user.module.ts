import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
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
  NbCardModule
} from '@nebular/theme';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestFormComponent } from './request-form/request-form.component';

@NgModule({
  declarations: [UserComponent, HomeComponent, ProfileComponent, RequestFormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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



  ]
})
export class UserModule { }
