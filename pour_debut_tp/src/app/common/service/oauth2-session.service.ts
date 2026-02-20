import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthErrorEvent, OAuthInfoEvent, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { UserInSession } from '../data/user_in_session';
import { Location } from '@angular/common';
//import { SessionService } from './session.service';


@Injectable({
  providedIn: 'root'
})
export class OAuth2SessionService {

  //private _sessionService = inject(SessionService);

  private _userInSession = new UserInSession();

  public get userInSession(){ return this._userInSession;}

  public set userInSession(u:UserInSession){
    this._userInSession=u;
    sessionStorage.setItem("session.userInSession",JSON.stringify(this._userInSession));
  }

 
  constructor(private oauthService: OAuthService , private router : Router,private location: Location) { 
        this.initOAuthServiceForCodeFlow();
        let sUser = sessionStorage.getItem("session.userInSession");
        if(sUser) {
          this._userInSession = JSON.parse(sUser);
        }
  }

  initOAuthServiceForCodeFlow(){
    const authCodeFlowConfig: AuthConfig = {
      // Url of the Identity Provider
      issuer: 'https://www.d-defrance.fr/keycloak/realms/sandboxrealm',
  
      // URL of the SPA to redirect the user to after login
      //redirectUri: window.location.origin + "/ngr-loggedIn",

      silentRefreshRedirectUri: window.location.origin + this.location.prepareExternalUrl("/silent-refresh.html"),
      useSilentRefresh: true,
      
      postLogoutRedirectUri : window.location.origin +  this.location.prepareExternalUrl("/ngr-oauth2-login-out"), 
      //ou /ngr-welcome ou ...
  
      // The SPA's id. The SPA is registered with this id at the auth-server
      // clientId: 'webappclient2',
      clientId: 'anywebappclient',
      //clientSecret if necessary (not very useful for web SPA)
      //dummyClientSecret is required if client not public (client authentication: on + credential in keycloak)
	  //dummyClientSecret: 'DMzPzIV2OQAphSbR84D7ebwxjrUNBgq5' ,
      responseType: 'code',
  
      // set the scope for the permissions the client should request
      // The first four are defined by OIDC.
      // Important: Request offline_access to get a refresh token
      // The api scope is a usecase specific one
      scope: 'openid profile resource.read resource.write resource.delete',
  
      showDebugInformation: true,
    };
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.oidc = true; // ID_Token

    this.oauthService.setStorage(sessionStorage);
    
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events.subscribe(
      event => {
        if (event instanceof OAuthSuccessEvent) {
          //console.log("OAuthSuccessEvent: "+JSON.stringify(event));
          console.log("OAuthSuccessEvent: "+event.type);
          this.manageSuccessEvent(event);
        }
        if (event instanceof OAuthInfoEvent) {
         // console.log("OAuthInfoEvent: "+JSON.stringify(event));
         console.log("OAuthInfoEvent: "+event.type);
        }
        if (event instanceof OAuthErrorEvent) {
         // console.error("OAuthErrorEvent: "+JSON.stringify(event));
         console.log("OAuthErrorEvent: "+event.type);
        } else {
          console.warn(event.type);
        }
      });

  }//end of initOAuthServiceForCodeFlow

  manageSuccessEvent(event : OAuthSuccessEvent){
    if(event.type=="token_received" ){
      console.log("***** token_received ****")
      this._userInSession.authenticated = true;
      let grantedScopesObj : object = this.oauthService.getGrantedScopes();
      this._userInSession.grantedScopes =<any> grantedScopesObj;
      console.log("grantedScopes="+JSON.stringify(this._userInSession.grantedScopes));

      var claims : any = this.oauthService.getIdentityClaims();
      console.log("claims="+JSON.stringify(claims))
      if (claims) this._userInSession.username= claims.preferred_username + "("+ claims.name + ")";
      
	  //this._sessionService.userInSession$=this._userInSession;
	  
      /*
      //not necessary with popup and silent-refresh
      let savedData = sessionStorage.getItem("data");
      if(savedData){
        this.data = JSON.parse(savedData)
      }
      */
     if(this.oauthService.silentRefreshRedirectUri != null){
       //this.router.navigateByUrl("/ngr-loggedIn");
       this.router.navigateByUrl("/ngr-welcome"); //with message form this SessionService if successuf login
     }
    }
  }


  delegateOidcLogin(){
      /*
      //not necessary with popup and silent-refresh:
      sessionStorage.setItem("data",JSON.stringify(this.data)) //store session data before redirect and lost
     */

      //this.oauthService.initImplicitFlow(); //Attention: possible que si configuré par le serveur OAuth2/OIDC .
      //this.oauthService.initCodeFlow(); //c'est mieux

      //this.oauthService.initLoginFlow(); //appel en interne
      //.initImplicitFlow(); ou .initCodeFlow(); 
      //selon la configuration préalablement enregistrée.

      this.oauthService.initLoginFlowInPopup();
  }

  oidcLogout(){
       //this.oauthService....
       this.oauthService.logOut(); //clear tokens in storage and redirect to logOutEndpoint
       //this.oauthService.revokeTokenAndLogout(); //warning : problems if no CORS settings !!!!

       //delete old cookies (oauth2/oidc/keycloak):
       document.cookie = "AUTH_SESSION_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       document.cookie = "AUTH_SESSION_ID_LEGACY=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

 

  public get accessTokenString() : string {
    return this.oauthService.getAccessToken();
  }

}
