import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed-pipe';

@Component({
  selector: 'app-tva',
  imports: [FormsModule , DecimalPipe , ToFixedPipe],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.css',
})
export class TvaComponent {
  ht = 0;
  taux = 20;//en % , 20% par defaut
  listeTaux = [5, 10, 20]; //en %
  tva = 0;
  ttc = 0;

  onCalculerTvaEtTtc() {
    this.tva = this.ht * this.taux / 100;
    this.ttc = this.ht + this.tva;
  }






  mapTauxCategorieProd = new Map<number, string[]>();
  tauxSel: number | undefined = undefined; //taux sélectionné
  listeCategoriePourTauxSel : string[]= [];
  constructor() {
    this.mapTauxCategorieProd.set(20, ["services", "outils", "objets"]);
    this.mapTauxCategorieProd.set(10, ["transports", "hotels", "restaurants", "spectacles", "médicaments"]);
    this.mapTauxCategorieProd.set(5, ["aliments", "énergies", "livres"]);
  }

  onSelectTaux(t:number){
    this.tauxSel = t;
    this.listeCategoriePourTauxSel=this.mapTauxCategorieProd.get(this.tauxSel)??[]

  }
}
