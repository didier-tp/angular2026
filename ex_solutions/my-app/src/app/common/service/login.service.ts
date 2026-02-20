import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginResponse } from '../data/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private _apiBaseUrl ="https://www.d-defrance.fr/tp/standalone-login-api/v1";
  private _apiBaseUrl ="tp/standalone-login-api/v1";

  constructor(private _http: HttpClient) { }

  public postLogin$(login: Login): Observable<LoginResponse>{
    let url =this._apiBaseUrl +"/public/auth";
    return this._http.post<LoginResponse>(url,login);
  }
}
