import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

class Voiture {
  constructor(public marque:string="marque_xx",
              public model:string="model_yy" ,
              public puissance:number=0 
              ){ }
}

@Component({
  selector: 'app-mutable',
  imports: [JsonPipe],
  templateUrl: './mutable.component.html',
  styleUrl: './mutable.component.css',
})
export class MutableComponent {

  after1s():Observable<string>{
    return of("ok").pipe(delay(1000));
  }
   sCounter = signal(0);
   sVoiture = signal<Voiture>(new Voiture());
   sListe = signal<Voiture[]>([]);

   onIncrementCounter(){
    this.sCounter.set(this.sCounter()+1);
    console.log("new sCounter value="+ JSON.stringify(this.sCounter()))
   }

   onIncrementCounterV2(){
    //this.after1s().subscribe(()=>{ this.onIncrementCounter();  });
    setTimeout(()=>{ this.onIncrementCounter();  } , 1000)
   }

   onIncrementPuissanceVoiture(){
      let voiture=this.sVoiture();
      //voiture = new Voiture (voiture.marque, voiture.model, voiture.puissance+1);
      voiture.puissance++;//pas toujours de ré-affichage immédiat
      this.sVoiture.set(voiture); //pas toujours de ré-affichage immédiat si même instance , toujours réaffichage immédiat si nouvelle instance
      console.log("new sVoiture value="+ JSON.stringify(this.sVoiture()))
      this.sListe().push(voiture);
       console.log("new sListe value="+ JSON.stringify(this.sListe()))
   }

   onIncrementPuissanceVoitureV2(){
    //this.after1s().subscribe(()=>{ this.onIncrementPuissanceVoiture();  });
    setTimeout(()=>{ this.onIncrementPuissanceVoiture();  } , 1000)
   }
         
}
