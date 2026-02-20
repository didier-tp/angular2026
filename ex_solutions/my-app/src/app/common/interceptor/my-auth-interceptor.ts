import { HttpInterceptorFn } from '@angular/common/http';

export const myAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('access_token');
    if(token && token!="" && token != "null"){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      console.log("MyAuthInterceptor , adding Bearer token="+token)
      return next(authReq); //ou bien next.handle(authReq) dans anciennes versions d'angular
    }else
      return next(req); //ou bien next.handle(req) dans anciennes versions d'angular
};
