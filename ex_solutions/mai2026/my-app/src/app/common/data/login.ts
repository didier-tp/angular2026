export class Login {
 constructor(
public  username : string ="admin1",
public  password : string ="pwd1",
public  roles : string ="admin" ){}
}

export class LoginResponse {
 constructor(
     public  username : string ="",
     public  status : boolean =false,
     public  message : string ="",
     public  token : string | null = null,
     public  scope : string | null = null
    ){}
}

