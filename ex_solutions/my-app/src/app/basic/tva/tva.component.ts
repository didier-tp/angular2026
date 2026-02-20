import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed-pipe';
import { TvaService } from '../../common/service/tva.service';

@Component({
  selector: 'app-tva',
  imports: [FormsModule, DecimalPipe , ToFixedPipe],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.css',
})
export class TvaComponent {

  tvaService = inject(TvaService)

//ht : Signal<number> = signal(0); // ==> PROBLEME : component.ht.set(200) // DOES NOT COMPILE IN test class !!!!
  //ht : WritableSignal<number> = signal(0); //ok
  ht = signal<number>(0); //OK
  //tauxTvaPct : WritableSignal<number> = signal(20);
  tauxTvaPct = signal<number>(20); //OK
  //tva =computed(()=> this.ht() * this.tauxTvaPct() / 100.0);
  tva = computed(()=>this.tvaService.tva(this.ht(), this.tauxTvaPct()))
  //ttc =computed(()=> this.ht() * (1 + this.tauxTvaPct() / 100.0));
  ttc =computed(()=> this.tvaService.ttc(this.ht(), this.tauxTvaPct()));

  tauxPossibles = [ 5, 10, 20];

  //partie facultative complémentaire:

  mapTauxCategorieProd= new Map<number,string[]>();
  tauxSel : number | undefined = undefined; //taux sélectionné
  listeCategoriePourTauxSel : string[] = [];

  constructor(){
    this.mapTauxCategorieProd.set(20 , [ "services" ,"outils" , "objets"]);
    this.mapTauxCategorieProd.set(10 , [ "transports" ,"hotels" , "restaurants" , "spectacles" , "médicaments"]);
    this.mapTauxCategorieProd.set(5 , [ "aliments" ,"énergies" , "livres" ]);
  }

  onSelectTaux(t:number){
    this.tauxSel=t;
    this.listeCategoriePourTauxSel=this.mapTauxCategorieProd.get(t)??[];
  }
}
