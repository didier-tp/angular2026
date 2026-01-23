export interface LoginData {
  username: string;
  password: string;
  roles:string;
}

export class Login implements LoginData {
     constructor(
       public  username : string ="",
       public  password : string ="",
       public  roles : string ="" ){}
}
