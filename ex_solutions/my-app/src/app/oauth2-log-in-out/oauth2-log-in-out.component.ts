import { Component, OnInit } from '@angular/core';
import { OAuth2SessionService } from '../common/service/oauth2-session.service';

@Component({
  selector: 'app-oauth2-log-in-out',
  templateUrl: './oauth2-log-in-out.component.html',
  styleUrls: ['./oauth2-log-in-out.component.scss']
})
export class OAuth2LogInOutComponent implements OnInit {

  constructor(public oauth2SessionService : OAuth2SessionService) {
  }

  public login() {
      this.oauth2SessionService.delegateOidcLogin();
  }

  public logout() {
      this.oauth2SessionService.oidcLogout();
  }



  ngOnInit(): void {
  }

}
