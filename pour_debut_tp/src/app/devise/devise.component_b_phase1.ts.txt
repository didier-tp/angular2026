import { ChangeDetectorRef, Component, effect, inject, OnInit, signal } from '@angular/core';
import { Devise } from '../common/data/devise';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-devise',
  imports: [FormsModule],
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.css']
})
export class DeviseComponent implements OnInit {

  cloneDevise(d:Devise){
    return JSON.parse(JSON.stringify(d));
  }

  sTabDevises = signal<Devise[]>([]);

  changeDetectorRef = inject(ChangeDetectorRef); //for this.changeDetectorRef.markForCheck();

  sSelectedDevise = signal<Devise | undefined> (undefined);

  //[(ngModel)]="deviseTemp.code" , ....
  deviseTemp = new Devise("?","?",0);

  sMessage = signal("");

  sMode = signal<"newOne" | "existingOne"> ("newOne");


  constructor() {
    //V1 (sans backend), avec des valeurs simulées en mémoire
    this.sTabDevises.set ( 
      [ new Devise("EUR","Euro",1),   new Devise("USD","Dollar",1.1),
        new Devise("GBP","Livre",0.9),   new Devise("JPY","Yen",120)]);
   }

  ngOnInit(): void {
  }

  onSelectDevise(d : Devise){
     this.sSelectedDevise.set(d);
     this.deviseTemp=this.cloneDevise(d);
  }

  onUpdate(){
    if(this.sSelectedDevise()==undefined) return;
        this.updateArrayAndSelectionWithSignal(this.deviseTemp);
  }

  //NB: this sub function will be often called with d = this.deviseTemp 
  updateArrayAndSelectionWithSignal(devise: Devise){
    //1. find first item whose .id/.code is the d.code
    let existingDevisesWithSearchedId = this.sTabDevises().filter(d => d.code == devise.code);//return a array or undefined
    if(existingDevisesWithSearchedId){
        let cDevise =  this.cloneDevise(devise);
        this.sSelectedDevise.set(cDevise);//new selection
        this.sTabDevises.set(this.sTabDevises().map( (d:Devise) => (d.code==devise.code)?cDevise : d) ); //replace new selected item
    }
}

  //à coder en TP:
  //onNew() , onAdd() , onDelete() , onUpdate(), onSelectDevise(d : Devise )

}
