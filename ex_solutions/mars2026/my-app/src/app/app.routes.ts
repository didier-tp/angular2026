import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DeviseComponent } from './devise/devise.component';

export const routes: Routes = [
    { path: 'ngr-welcome', component: WelcomeComponent },
    { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
    { path: 'ngr-login', component: LoginComponent },
    { path: 'ngr-basic', component: BasicComponent },
     { path: 'ngr-conversion', component: ConversionComponent },
       { path: 'ngr-devise', component: DeviseComponent },
    { path: '**', redirectTo: '/ngr-welcome', pathMatch: 'full'}
];
