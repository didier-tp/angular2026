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

  tabDevises : Devise[]=[];

  changeDetectorRef = inject(ChangeDetectorRef); //for this.changeDetectorRef.markForCheck();

  selectedDevise : Devise | undefined = undefined;

  //[(ngModel)]="deviseTemp.code" , ....
  deviseTemp = new Devise();

  sMessage = signal("");

  sMode = signal<"newOne" | "existingOne"> ("newOne");


  constructor() {
    /*
    //V1 (sans backend), avec des valeurs simulées en mémoire
    this.tabDevises.push(new Devise("EUR","Euro",1));
    this.tabDevises.push(new Devise("USD","Dollar",1.1));
    this.tabDevises.push(new Devise("GBP","Livre",0.9));
    this.tabDevises.push(new Devise("JPY","Yen",120));
    */
   }

   onRefresh() {
       this.deviseService.getAllDevises$()
       .subscribe(
    		 { next: (allDevises)=>{ this.tabDevises=allDevises; this.changeDetectorRef.markForCheck(); } ,
    		  error: (err)=>{ this.sMessage.set(messageFromError(err,"devises load/refresh")); }
   		});
   }


  ngOnInit(): void {
    this.onRefresh();
  }

  onSelectDevise(d : Devise){
     this.selectedDevise=d;
     this.deviseTemp=this.cloneDevise(d);
     this.sMode.set("existingOne")
     this.sMessage.set("")
  }

 async onUpdate() {
    try {
      await firstValueFrom(this.deviseService.putDevise$(this.deviseTemp));
      this.updateClientSide(this.deviseTemp) ; 
    } catch (err) {
      console.log(err);
      this.sMessage.set(messageFromEx(err,"devise update error"));
    }
  }

  updateClientSide(updatedDevise:Devise){
    if(this.selectedDevise==undefined) return;
    this.selectedDevise.change = updatedDevise.change;
    this.selectedDevise.name = updatedDevise.name;
    this.selectedDevise.code = updatedDevise.code;
    this.sMessage.set("devise mise à jour")
  }

  //à coder en TP:
  onNew(){
     this.deviseTemp = new Devise();
     this.selectedDevise=undefined;
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
    this.tabDevises.push(savedDevise);
    this.onNew();
    this.sMessage.set("devise ajoutée")
  }

  async onDelete() {
    if(this.selectedDevise==undefined) return;
    try {
      await firstValueFrom(this.deviseService.deleteDeviseByCode$(this.selectedDevise.code));
      this.deleteClientSide(this.selectedDevise) ; 
    } catch (err) {
      console.log(err);
      this.sMessage.set(messageFromEx(err,"devise delete error"));
    }
  }

  deleteClientSide(deletedDevise:Devise){
     if(deletedDevise!=undefined){
        for(let i = 0;i<this.tabDevises.length;i++)
          if(this.tabDevises[i]==deletedDevise){
            this.tabDevises.splice(i,1); break;
          }
       this.onNew()
       this.sMessage.set("devise supprimée")
     }  
  } 

}
