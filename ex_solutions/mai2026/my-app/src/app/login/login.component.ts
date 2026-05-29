import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Login } from '../common/data/login';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../common/service/login.service';
import { messageFromError } from '../common/component/util/util';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public login : Login = new Login();
  public message /* :string */ ="";
  public ok=true;

  loginService = inject(LoginService);
  changeDetectorRef = inject(ChangeDetectorRef);

  public onLogin(){
        //this.message = "donnees saisies = " + JSON.stringify(this.login);

        this.loginService.postLogin$(this.login).subscribe({
          next: (loginResponse)=>{ 
            this.message = loginResponse.message;
            this.ok=loginResponse.status;
            this.changeDetectorRef.markForCheck();
          },
          error:(err)=>{console.log(err); 
            this.message= messageFromError(err,"echec login");
            this.ok=false;
            this.changeDetectorRef.markForCheck();
          }
        })
  }
}
