import { Component, inject, signal } from '@angular/core';
import { Login, LoginResponse } from '../common/data/login';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../common/service/login.service';
import { SessionService } from '../common/service/session.service';
import { UserInSession } from '../common/data/user_in_session';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //login = new Login();
  login = new Login("admin1","pwd1","administrator");
  message = signal("");
  ok=true;

  public loginService = inject(LoginService);
  public sessionService = inject(SessionService);

  onLogin(){
   //V1:
   //this.message.set("valeurs saisies=" + JSON.stringify(this.login));

   sessionStorage.setItem("access_token","");
   this.loginService.postLogin$(this.login)
   .subscribe({
      next: (loginResponse : LoginResponse)=>{ this.message.set(loginResponse.message);
                                               this.ok = loginResponse.status;
                                               console.log(JSON.stringify(loginResponse));
                                               sessionStorage.setItem("access_token",loginResponse.token);
                                               this.sessionService.sUserInSession.set(new UserInSession(loginResponse.username, loginResponse.status))
      },
      error: (err)=>{console.log(JSON.stringify(err)); 
        this.sessionService.resetAfterLogout();
      }
     })
  }

  onLogout(){
    sessionStorage.setItem("access_token","");
    this.sessionService.resetAfterLogout();
    this.message.set("logout , not connected");
  }
}
