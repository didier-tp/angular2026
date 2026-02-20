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

export class LoginResponse {
    constructor(
        public username : string ="",
        public status: boolean = false,
        public message : string ="",
        public token : string ="" ,
        public scope : string =""){}
}