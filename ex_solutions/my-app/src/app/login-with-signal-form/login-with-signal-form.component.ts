import { Component, computed, effect, inject, signal } from '@angular/core';
import { Login, LoginData, LoginResponse } from '../common/data/login';
import { email, form, FormField, min, minLength, pattern, required } from '@angular/forms/signals';
import { Person, PersonData } from '../common/data/person';
import { JsonPipe, NgClass } from '@angular/common';
import { LoginService } from '../common/service/login.service';
import { SessionService } from '../common/service/session.service';
import { UserInSession } from '../common/data/user_in_session';

@Component({
  selector: 'app-login-with-signal-form',
  imports: [FormField,NgClass,JsonPipe],
  templateUrl: './login-with-signal-form.component.html',
  styleUrl: './login-with-signal-form.component.css',
})
export class LoginWithSignalFormComponent {

   //src/app/common/data/login.ts with LoginData interface and Login class (implements LoginData)
   //loginModel = signal<LoginData>({ username: '', password: '', roles : ''});
  //loginModel = signal<LoginData>(new Login());
 loginModel = signal<LoginData>(new Login("admin1","pwd1","administrator"));//form data as WritableSignal
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

  message = signal("");
  ok=true;

  public loginService = inject(LoginService);
  public sessionService = inject(SessionService);

  usernameError=computed(()=> this.loginForm.username().errors().map(e=>e.message).join(" "));
  passwordError=computed(()=> this.loginForm.password().errors().map(e=>e.message).join(" "));

  isLoginFieldValid(fieldName:string ){
    switch(fieldName){
      case "username": return  ! this.loginForm.username().invalid();
      case "password": return  ! this.loginForm.password().invalid();
      case "roles": return  ! this.loginForm.roles().invalid();
      default : return false;
    }
  }

  classForLoginField(fieldName:string) {
   let v= this.isLoginFieldValid(fieldName);
  return {
    'ng-valid': v,     
    'ng-invalid': !v, 
    }
 }

  onLogin(){
   //V1:
   this.ok=true;
   //this.message.set("valeurs saisies=" + JSON.stringify(this.loginModel()));

   sessionStorage.setItem("access_token","");
      this.loginService.postLogin$(this.loginModel())
      .subscribe({
         next: (loginResponse : LoginResponse)=>{ this.message.set(loginResponse.message);
                                                  this.ok = loginResponse.status;
                                                  console.log(JSON.stringify(loginResponse));
                                                  sessionStorage.setItem("access_token",loginResponse.token);
                                                   this.sessionService.sUserInSession.set(new UserInSession(loginResponse.username, loginResponse.status))
         },
         error: (err)=>{console.log(JSON.stringify(err))}
        })


  }

  onValidateLoginForm(){
    this.ok=true; this.message.set("");
    if(/*this.loginForm.username().touched() &&*/ this.loginForm.username().invalid()){
      this.ok=false;
      for(let e of this.loginForm.username().errors())
          this.message.set( this.message() + ` ${e.message} `)
    }
    if(/*this.loginForm.password().touched() &&*/ this.loginForm.password().invalid()){
      this.ok=false;
      for(let e of this.loginForm.password().errors())
         this.message.set( this.message() + ` ${e.message} `)
    }
  }


   onLogout(){
    sessionStorage.setItem("access_token","");
    this.message.set("logout , not connected");
    this.sessionService.resetAfterLogout();
  }

    //src/app/common/data/person.ts with PersonData interface and Person class (implements PersonData)
   //personModel = signal<PersonData>({ firstname: '', lastname: '', email : '' , age: 0});
  //personModel = signal<PersonData>(new Person());
  personModel = signal<PersonData>(new Person('jean','Bon','jean.bon@xyz.com', 40));//form data as WritableSignal
      //that will be synchronized with inputs of form ([formField]="personForm.firstname" is bi-directionnal)


  //personForm = form(this.personModel); //version simple/élémentaire sans validateur
  personForm = form(this.personModel, (schemaPath) => {
    required(schemaPath.firstname, {message: 'firstname is required'});
    required(schemaPath.lastname, {message: 'lastname is required'});
    minLength(schemaPath.firstname, 2 , {message: 'firstname length must be at least 2'});
    email(schemaPath.email, { message: 'Please enter a valid email address' });
    min(schemaPath.age, 18, { message: 'You must be at least 18 years old' });
    pattern(schemaPath.lastname, /^[A-Z].+/ , {message: 'lastname must start by uppercase , at least 2 characters'});
    });

  

  messagePerson = "";
  okPerson=true;

  okEffect = effect( ()=>{ this.okPerson = ! this.personForm().invalid();  this.messagePerson="" })

  onPerson(){
   //V1:
   this.okPerson=true;
   this.messagePerson="valeurs saisies=" + JSON.stringify(this.personModel());
  }
  
/*
  onValidatePersonForm(){
    this.ok=true; this.message="";
    if(this.personForm.firstname().invalid()){
      this.ok=false;
      for(let e of this.personForm.firstname().errors())
          this.message += ` ${e.message} `
    }
    if( this.personForm.age().invalid()){
      this.ok=false;
      for(let e of this.personForm.age().errors())
          this.message += ` ${e.message} `
    }
  }
  */

  


  firstnameError=computed(()=> this.personForm.firstname().errors().map(e=>e.message).join(" "));
  lastnameError=computed(()=> this.personForm.lastname().errors().map(e=>e.message).join(" "));
  emailError=computed(()=> this.personForm.email().errors().map(e=>e.message).join(" "));
  ageError=computed(()=> this.personForm.age().errors().map(e=>e.message).join(" "));


  isFieldValid(fieldName:string ){
    switch(fieldName){
      case "firstname": return  ! this.personForm.firstname().invalid();
      case "lastname": return  ! this.personForm.lastname().invalid();
      case "email": return  ! this.personForm.email().invalid();
      case "age": return  ! this.personForm.age().invalid();
      default : return false;
    }
  }

  classForField(fieldName:string) {
   let v= this.isFieldValid(fieldName);
  return {
    'ng-valid': v,     
    'ng-invalid': !v, 
    }
 }

}
