import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const router = inject(Router);
  let token = sessionStorage.getItem('access_token');
  if(token != "" && token!="null")
      return true;
    else
      //return false; //bloquer la route sans explication
     return router.parseUrl('/ngr-not-authorized');
};
