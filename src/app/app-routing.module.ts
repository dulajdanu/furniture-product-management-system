import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { UserguardService } from './user/userguard.service';
import { ClerkguardService } from './clerk/clerkguard.service';
import { ManagerguardService } from './manager/managerguard.service';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [UserguardService] },
  { path: 'manager', loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule), canActivate: [ManagerguardService] },
  { path: 'clerk', loadChildren: () => import('./clerk/clerk.module').then(m => m.ClerkModule), canActivate: [ClerkguardService] },
  {
    path: 'home', component: MainPageComponent
  },
  { path: '**', redirectTo: 'home' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
