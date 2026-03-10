import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: 'ngr-welcome', component: WelcomeComponent },
    { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
    { path: 'ngr-login', component: LoginComponent },
    { path: 'ngr-basic', component: BasicComponent },
    { path: '**', redirectTo: '/ngr-welcome', pathMatch: 'full'}
];
