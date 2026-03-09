import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tva',
  imports: [FormsModule],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.css',
})
export class TvaComponent {
    ht = 0;  
    taux = 20;//en % , 20% par defaut
    listeTaux=[5,10,20]; //en %
    tva = 0;
    ttc = 0;

    onCalculerTvaEtTtc(){
      this.tva=this.ht * this.taux / 100;
      this.ttc = this.ht + this.tva;
    }
}
