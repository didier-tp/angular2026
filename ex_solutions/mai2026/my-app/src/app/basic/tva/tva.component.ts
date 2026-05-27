import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed-pipe';

@Component({
  selector: 'app-tva',
  imports: [FormsModule , DecimalPipe , ToFixedPipe],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.css',
})
export class TvaComponent {
  ht = signal(0);
  taux=signal(20); //en %
  tva=computed(()=>this.ht() * this.taux() / 100 );
  ttc=computed(()=>this.ht() + this.tva() );

  tauxPossibles = [ 5 , 10, 20];

  age=signal(20);

  onIncrementAge(){
    this.age.set(this.age()+1);
  }

  onDecrementAge(){
    //this.age.set(this.age()-1);
    this.age.update(a=>a-1);
  }

  mineurMajeurEffect = effect(()=>{
    if(this.age()>=18)
      console.log("majeur");
    else
      console.log("mineur");
  });

}
