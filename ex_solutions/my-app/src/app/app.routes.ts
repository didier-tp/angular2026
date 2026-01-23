import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ConversionComponent } from './conversion/conversion.component';
import { LoginWithSignalFormComponent } from './login-with-signal-form/login-with-signal-form.component';

export const routes: Routes = [
  { path: 'ngr-welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
  { path: 'ngr-login', component: LoginComponent },
  { path: 'ngr-login-wsf', component: LoginWithSignalFormComponent },
  { path: 'ngr-basic', component: BasicComponent },
  { path: 'ngr-conversion', component: ConversionComponent },
  { path: 'ngr-reservation', component: ReservationComponent },
  { path: '**', redirectTo: '/ngr-welcome', pathMatch: 'full'}
];
