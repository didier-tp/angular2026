import { inject, Injectable } from '@angular/core';
import { Observable, of, delay, throwError, map } from 'rxjs';
import { Devise } from '../data/devise';
import { HttpClient } from '@angular/common/http';


export interface ConvertRes {
 source :string; //ex: "EUR",
 target :string; //ex: "USD",
 amount :number; //ex: 200.0
 result :number; //ex: 217.3913
};


@Injectable({
  providedIn: 'root'
})
export class DeviseService {
  //private _apiBaseUrl ="https://www.d-defrance.fr/tp/devise-api/v1"; 

  private _apiBaseUrl ="tp/devise-api/v1"; 
 // with prefix in proxy.conf.json 
 // (ng serve --proxy-config proxy.conf.json)
 // or other config in production mode

  //constructor(private _http : HttpClient){}
  private _http = inject(HttpClient);

  public getAllDevises$() : Observable<Devise[]>{
    let url = this._apiBaseUrl + "/public/devises" ;
    console.log( "url = " + url);
    return this._http.get<Devise[]>(url);
  }

  public convertir$(montant: number,
                   codeDeviseSrc : string, 
                   codeDeviseTarget : string
                   ) : Observable<number> {
      const url = this._apiBaseUrl + "/public/convert" 
         + `?source=${codeDeviseSrc}`
         + `&target=${codeDeviseTarget}&amount=${montant}` ;
      //console.log( "url = " + url);
      return this._http.get<ConvertRes>(url)
            .pipe(
              map( (res:ConvertRes) => res.result)
            );
  }

public getDeviseByCode$(code :string ) : Observable<Devise>{
    let url = `${this._apiBaseUrl}/public/devises/${code}` ;
    console.log( "url = " + url);
    return this._http.get<Devise>(url);
  }
  putDevise$(d :Devise): Observable<Devise>{
    //const url = `${this.publicOrPrivateBaseUrl}/devises/${d.code}?v=true`;
    const url = `${this._apiBaseUrl}/private/devises/${d.code}?v=true`; 
    return this._http.put<Devise>(url,d /*input envoyé au serveur*/);
  }

}