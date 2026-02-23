import { ChangeDetectorRef, Component, effect, inject, OnInit, signal } from '@angular/core';
import { Devise } from '../common/data/devise';
import { FormsModule } from '@angular/forms';
import { DeviseService } from '../common/service/devise.service';
import { messageFromError, messageFromEx } from '../common/util/util';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-devise',
  imports: [FormsModule],
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.css']
})
export class DeviseComponent implements OnInit {

  deviseService = inject( DeviseService);

  cloneDevise(d:Devise){
    return JSON.parse(JSON.stringify(d));
  }

  sTabDevises = signal<Devise[]>([]);

  changeDetectorRef = inject(ChangeDetectorRef); //for this.changeDetectorRef.markForCheck();

  sSelectedDevise = signal<Devise | undefined> (undefined);

  //[(ngModel)]="deviseTemp.code" , ....
  deviseTemp = new Devise();

  sMessage = signal("");

  sMode = signal<"newOne" | "existingOne"> ("newOne");


  constructor() {
    /*
    //V1 (sans backend), avec des valeurs simulées en mémoire
    this.sTabDevises.set ( 
      [ new Devise("EUR","Euro",1),   new Devise("USD","Dollar",1.1),
        new Devise("GBP","Livre",0.9),   new Devise("JPY","Yen",120)]);
    */
   }

  onRefresh() {
       this.deviseService.getAllDevises$()
       .subscribe(
    		 { next: (allDevises)=>{ this.sTabDevises.set(allDevises);/* this.changeDetectorRef.markForCheck(); */} ,
    		  error: (err)=>{ this.sMessage.set(messageFromError(err,"devises load/refresh")); }
   		});
   }


  ngOnInit(): void {
    this.onRefresh();
  }

  onSelectDevise(d : Devise){
     this.sSelectedDevise.set(d);
     this.deviseTemp=this.cloneDevise(d);
     this.sMode.set("existingOne")
     this.sMessage.set("")
  }

  async onUpdate() {
    if(this.sSelectedDevise()==undefined) return;
    try {
      await firstValueFrom(this.deviseService.putDevise$(this.deviseTemp));
      this.updateArrayAndSelectionWithSignal(this.deviseTemp) ; 
    } catch (err) {
      console.log(err);
      this.sMessage.set(messageFromEx(err,"devise update error"));
    }
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
  onNew(){
     this.deviseTemp = new Devise();
     this.sSelectedDevise.set(undefined);
     this.sMode.set("newOne");
     this.sMessage.set("")
  }

  onAdd(){
    this.deviseService.postDevise$(this.deviseTemp)
   		 .subscribe(
    		 { next: (savedDevise)=>{ this.addClientSide(savedDevise); } ,
    		  error: (err)=>{ this.sMessage.set(messageFromError(err,"echec post")); }
   		});
  }

  addClientSide(savedDevise:Devise){
    // this.sTabDevises().push(savedDevise); BAD CODE , change not detected after  mutable array upadate
    this.sTabDevises.set([...this.sTabDevises(), this.cloneDevise(savedDevise)]);//using spread operator  , new array
    this.onNew();
    this.sMessage.set("devise ajoutée")
  }

   async onDelete() {
    let selectedDevise = this.sSelectedDevise();
    if(selectedDevise==undefined) return;
    try {
      await firstValueFrom(this.deviseService.deleteDeviseByCode$(selectedDevise.code));
      this.deleteClientSide(selectedDevise) ; 
    } catch (err) {
      console.log(err);
      this.sMessage.set(messageFromEx(err,"devise delete error"));
    }
  }

  deleteClientSide(deletedDevise:Devise){

      if(deletedDevise!=undefined){
        this.sTabDevises.set(this.sTabDevises().filter(d=>d.code != deletedDevise.code));
       this.onNew()
       this.sMessage.set("devise supprimée")
     }  
  } 


}
