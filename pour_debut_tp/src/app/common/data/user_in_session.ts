export class UserInSession{
    constructor(public username ="?" ,
                public authenticated=false,
                public roles="?",
                public grantedScopes : string[]= []){}
}