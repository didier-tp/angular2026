import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideZonelessChangeDetection , provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import localeEn from '@angular/common/locales/en';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { myAuthInterceptor } from './common/interceptor/my-auth-interceptor';
import { provideOAuthClient } from 'angular-oauth2-oidc';
registerLocaleData(localeEn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient( withInterceptors( [myAuthInterceptor] )),
    provideOAuthClient()
    //provideZonelessChangeDetection() //par defaut depuis angular 21
  ]
};


/*
Si besoin de rétablir zone.js sur projet angular 21 (déconseillé):
"zone.js": "~0.15.0" dans package.json 
et 
npm install
-----
provideZoneChangeDetection( { eventCoalescing : true})
dans app.config.ts
---
"architect": {
        "build": {
         ...
          "options": {
            ...,
            "polyfills": [ "zone.js"],
dans angular.json
*/