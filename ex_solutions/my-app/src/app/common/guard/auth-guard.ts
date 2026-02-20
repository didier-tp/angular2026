import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let token = sessionStorage.getItem("access_token");
  console.log("authGardGuard with token="+token);
  if(token!=null && token!= "" && token != "null") return true;
  //else return false;
  else return  of(createUrlTreeFromSnapshot(route, ['../ngr-not-authorized']));
};
