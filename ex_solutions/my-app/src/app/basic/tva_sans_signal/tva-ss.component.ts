import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed-pipe';

@Component({
  selector: 'app-tva-ss',
  imports: [FormsModule, DecimalPipe , ToFixedPipe],
  templateUrl: './tva-ss.component.html',
  styleUrl: './tva-ss.component.css',
})
//ancienne version V1 ou Ss (sans signal)
export class TvaSsComponent {
listeTaux=[5,10,20];
    
  ht=0;
  taux=20;//en %
  tva=0;
  ttc=0;

  onCalculerTvaTtc(){
    this.tva=this.taux/100 * this.ht;
    this.ttc = this.tva + this.ht;
    console.log(`onCalculerTvaTtc() ht=${this.ht} taux=${this.taux} tva=${this.tva} ttc=${this.ttc}`)
  }
  
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
