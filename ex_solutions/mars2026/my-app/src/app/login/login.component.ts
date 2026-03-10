import { Component } from '@angular/core';
import { Login } from '../common/data/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public login : Login = new Login();
  public message /* :string */ ="";
  public onLogin(){
  this.message = "donnees saisies = " + JSON.stringify(this.login);
  }
  constructor() { }
}
