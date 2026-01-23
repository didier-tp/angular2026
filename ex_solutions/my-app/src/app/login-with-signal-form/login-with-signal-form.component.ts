import { Component, signal } from '@angular/core';
import { Login, LoginData } from '../common/data/login';
import { email, form, FormField, minLength, pattern, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login-with-signal-form',
  imports: [FormField],
  templateUrl: './login-with-signal-form.component.html',
  styleUrl: './login-with-signal-form.component.scss',
})
export class LoginWithSignalFormComponent {

   //src/app/common/data/login.ts with LoginData interface and Login class (implements LoginData)
   //loginModel = signal<LoginData>({ username: '', password: '', roles : ''});
  //loginModel = signal<LoginData>(new Login());
  loginModel = signal<LoginData>(new Login('jeanBon','pwd','user'));//form data as WritableSignal
      //that will be synchronized with inputs of form ([formField]="loginForm.username" is bi-directionnal)

  //loginForm = form(this.loginModel);//loginForm.username , loginForm.password, ...

  //avec validateurs (de @angular/forms/signals)
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, {message: 'username is required'});
    required(schemaPath.password, {message: 'password is required'});
    minLength(schemaPath.password, 3 , {message: 'password length must be at least 3'});
    // email(schemaPath.email, { message: 'Please enter a valid email address' }),
    // min(schemaPath.age, 18, { message: 'You must be at least 18 years old' }),
    pattern(schemaPath.username, /^[a-zA-Z].+/ , {message: 'username must start by letter , at least 2 characters'});
    });

  //NB: no automatic .ng-valid , .ng-invalid css classe activation with signals forms !!!  

  message = "";
  ok=true;

  onLogin(){
   //V1:
   this.ok=true;
   this.message="valeurs saisies=" + JSON.stringify(this.loginModel());
  }

  onValidateLoginForm(){
    this.ok=true; this.message="";
    if(/*this.loginForm.username().touched() &&*/ this.loginForm.username().invalid()){
      this.ok=false;
      for(let e of this.loginForm.username().errors())
          this.message += ` ${e.message} `
    }
    if(/*this.loginForm.password().touched() &&*/ this.loginForm.password().invalid()){
      this.ok=false;
      for(let e of this.loginForm.password().errors())
          this.message += ` ${e.message} `
    }
  }

  
}
