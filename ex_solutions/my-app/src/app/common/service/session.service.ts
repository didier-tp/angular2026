import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInSession } from '../data/user_in_session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public sUserInSession = signal( new UserInSession());
  public sConnected = computed (()=>this.sUserInSession().authenticated );

  public resetAfterLogout(){
    this.sUserInSession.set(new UserInSession())
  }

  constructor() { }
}


