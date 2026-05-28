export class Reservation {
    constructor(
       public  firstName : string ="prenom",
       public  lastName : string ="Nom",
       public  telephone : string ="0605040302",
       public  email : string ="prenom.Nom@xyz.com" ,
       public  dateTime : Date = new Date()){}
}
