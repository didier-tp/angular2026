import { HttpClient } from '@angular/common/http';
import { UrlCodec } from '@angular/common/upgrade';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginResponse } from '../data/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  //private _apiBaseUrl ="https://www.d-defrance.fr/tp/standalone-login-api/v1"; 

  private _apiBaseUrl ="tp/standalone-login-api/v1"; 
 // with prefix in proxy.conf.json 
 // (ng serve --proxy-config proxy.conf.json)
 // or other config in production mode

  //constructor(private _http : HttpClient){}
  private _http = inject(HttpClient);

  public postLogin$(login: Login): Observable<LoginResponse>{
    let url = this._apiBaseUrl + "/public/auth";
    return  this._http.post<LoginResponse>(url,login);
  }
  
}
