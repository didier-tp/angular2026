export class Login {
    constructor(
        public username: string = "user1",
        public password: string = "pwd1",
        public roles: string = "user") { }
}

export class LoginResponse {
    constructor(
        public username: string = "",
        public status : boolean = false,
        public message: string = "",
        public token: string | null = null,
        public scope : string | null = null) { }
}