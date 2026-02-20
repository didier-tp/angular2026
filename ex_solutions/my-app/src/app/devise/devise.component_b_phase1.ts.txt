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

  tabDevises : Devise[]=[];

  changeDetectorRef = inject(ChangeDetectorRef); //for this.changeDetectorRef.markForCheck();

  selectedDevise : Devise | undefined = undefined;

  //[(ngModel)]="deviseTemp.code" , ....
  deviseTemp = new Devise("?","?",0);

  sMessage = signal("");

  sMode = signal<"newOne" | "existingOne"> ("newOne");


  constructor() {
    //V1 (sans backend), avec des valeurs simulées en mémoire
    this.tabDevises.push(new Devise("EUR","Euro",1));
    this.tabDevises.push(new Devise("USD","Dollar",1.1));
    this.tabDevises.push(new Devise("GBP","Livre",0.9));
    this.tabDevises.push(new Devise("JPY","Yen",120));
   }

  ngOnInit(): void {
  }

  onSelectDevise(d : Devise){
     this.selectedDevise=d;
     this.deviseTemp=this.cloneDevise(d);
  }

  onUpdate(){
    if(this.selectedDevise==undefined) return;
    this.selectedDevise.change = this.deviseTemp.change;
    //...
    
  }

  //à coder en TP:
  //onNew() , onAdd() , onDelete() , onUpdate(), onSelectDevise(d : Devise )

}
