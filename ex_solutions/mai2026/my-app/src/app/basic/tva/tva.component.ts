import { DecimalPipe, JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed-pipe';
import { TvaService } from '../../common/service/tva.service';

class Cxy{
  constructor(public ref:string="?",
              public value:number=0){}
}

class User{
    constructor(public firstName:string="?",
                public lastName:string="?",
                public email:string="?"){}
}


@Component({
  selector: 'app-tva',
  imports: [FormsModule , DecimalPipe , ToFixedPipe, JsonPipe],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.css',
})
export class TvaComponent {
  ht = signal(0);
  taux=signal(20); //en %
  tvaService = inject(TvaService);

  /*
  tva=computed(()=>this.ht() * this.taux() / 100 );
  ttc=computed(()=>this.ht() + this.tva() );
  */

tva = computed(()=>this.tvaService.tva(this.ht(), this.taux()))
ttc =computed(()=> this.tvaService.ttc(this.ht(), this.taux()));

  tauxPossibles = [ 5 , 10, 20];

  /* tests complémentaires temporaires sur signaux */

  age=signal(20);

  //internal angular behavoir: globalInternalEqualityFuntion : a===b || customDeepEqualityFunction
  //so customDeepEqualityFunction as NO EFFECT for trigger refresh in same instance !!!!

  //customDeepEqualityFunction is just useful to avoid refresh with same deep values of several litteral objects !!!

  objXy = new Cxy("ref1" , 0);
  sXy = signal(this.objXy);
  //sXy2 = signal({ ref:"ref2" , value:0 });
  sXy2 = signal({ ref:"ref2" , value:0 } , { equal : (a,b)=> (a.ref === b.ref) && (a.value === b.value)}); //custom deep equality function
  sTranformXy =  computed( ()=> new Cxy("tr_ref1" , - this.sXy().value ) )

  onIncrementAge(){
    this.age.set(this.age()+1);
   
  }

  onDecrementAge(){
    //this.age.set(this.age()-1);
    this.age.update(a=>a-1);
  }

  onUpdateXy(){
    
    this.objXy.value=this.objXy.value+1
    this.sXy.set(this.objXy); //just local display refresh BUT NO RESFRESH of effect/computed/...
    
   /*
   this.objXy=new Cxy("ref1",this.objXy.value+1);
   this.sXy.set(this.objXy); //always good refresh of all others (effect/computed/...)
  */

  //this.sXy2.set({ref:this.sXy2().ref, value: this.sXy2().value+1})
   this.sXy2.set({ref:this.sXy2().ref, value: this.sXy2().value})
  }

  mineurMajeurEffect = effect(()=>{
    if(this.age()>=18)
      console.log("majeur");
    else
      console.log("mineur");
  });

  sXyEffect = effect(()=>{
    const valObjXy=this.sXy();
    console.log("new value of sXy=" + JSON.stringify(valObjXy) );
  });

  sXy2Effect = effect(()=>{
    const valObjXy2=this.sXy2();
    console.log("new value of sXy2=" + JSON.stringify(valObjXy2) );
  });

  // Signal de base
  user = signal<User>({
    firstName: 'jean',
    lastName: 'Bon',
    email: 'jean.Bon@xyz.com'
  });
  
  // Signal lié (un peu comme computed() mais en lecture/ecriture )
  //firstName = linkedSignal( ()=>this.user().firstName ); //basic syntax

  
  //advanced syntax:
  firstName = linkedSignal<User,string>({
    source :  this.user,
    computation: (newUserFromSignal , previousSourceAndValue) =>{
      let computedFirstName="?";
      console.log("newUserFromSignal="+JSON.stringify(newUserFromSignal));
      console.log("previousSourceUser="+JSON.stringify(previousSourceAndValue?.source));
      console.log("previousFirstnameValue="+previousSourceAndValue?.value);
      //computedFirstName = newUserFromSignal.firstName; //default behaviour
      if(previousSourceAndValue?.value.includes("_"))
        computedFirstName= previousSourceAndValue?.value;
      else
        computedFirstName = newUserFromSignal.firstName;
      return computedFirstName;
    }
    }); 


  newFirstName="first_name"
  onUpdateFirstName(){
     this.firstName.set(this.newFirstName);
  }

   onUpdateUser(){
    this.user.set({
       firstName: 'alain',
       lastName: 'Therieur',
       email: 'alain.Therieur@xyz.com'
    })
  }

}
