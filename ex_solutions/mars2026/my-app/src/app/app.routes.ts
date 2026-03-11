import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DeviseComponent } from './devise/devise.component';
import { CalculatriceComponent } from './basic/calculatrice/calculatrice.component';
import { TvaComponent } from './basic/tva/tva.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { authGuard } from './common/gard/auth-guard';

export const routes: Routes = [
    { path: 'ngr-welcome', component: WelcomeComponent },
    { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full' },
    { path: 'ngr-login', component: LoginComponent },
    {
        path: 'ngr-basic', component: BasicComponent,
        children: [
            { path: 'tva', component: TvaComponent },
            { path: 'calculatrice/:mode', component: CalculatriceComponent },
            { path: '', redirectTo: 'tva', pathMatch: 'prefix' }
        ]
    },
    { path: 'ngr-conversion', component: ConversionComponent },
    { path: 'ngr-devise', component: DeviseComponent , canActivate: [authGuard]},
     { path: 'ngr-not-authorized', component: NotAuthorizedComponent },
    { path: '**', redirectTo: '/ngr-welcome', pathMatch: 'full' }
];
