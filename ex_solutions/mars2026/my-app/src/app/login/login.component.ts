import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Login } from '../common/data/login';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../common/service/login.service';
import { messageFromError } from '../common/util/util';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public login : Login = new Login();
  //public message /* :string */ ="";
  message = signal("");
  ok=signal(false);

  loginService = inject(LoginService);
  //changeDetectorRef = inject(ChangeDetectorRef); //pour angular 21 en mode zoneLess

  public onLogin(){
    // V1:  this.message = "donnees saisies = " + JSON.stringify(this.login);
    //V2:
    this.loginService.postLogin$(this.login).subscribe({
      next: (loginResponse)=>{ this.message.set(loginResponse.message);
                               this.ok.set(loginResponse.status);
                               /*this.message = loginResponse.message;
                               this.changeDetectorRef.markForCheck();*/
      },
      error: (err: HttpErrorResponse) => { this.message.set(messageFromError(err,"echec login")); }
    });
  }
  constructor() { }
}
