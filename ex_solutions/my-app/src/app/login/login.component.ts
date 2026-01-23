import { Component } from '@angular/core';
import { Login } from '../common/data/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //login = new Login();
  login = new Login("user1","pwd1","user");
  message = "";
  ok=true;

  onLogin(){
   //V1:
   this.message="valeurs saisies=" + JSON.stringify(this.login);
  }
}
