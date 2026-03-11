import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginResponse } from '../data/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

   private _apiBaseUrl = "tp/standalone-login-api";  

  private http = inject(HttpClient);

  public postLogin$(login: Login): Observable<LoginResponse>{
    let url = this._apiBaseUrl + "/public/auth";
    return this.http.post<LoginResponse>(url,login);
  }
}
