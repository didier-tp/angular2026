import { ChangeDetectorRef, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {

   public counter=signal(0);

   incrementerCompteur(){
       this.counter.update(c=>c+1);
       console.log("counteur="+this.counter());
   }


  //public couleurFondPreferee :string = 'lightgrey';
  private _couleurFondPreferee: string;

  public get couleurFondPreferee() {
    return this._couleurFondPreferee;
  }
  public set couleurFondPreferee(c: string) {
    this._couleurFondPreferee = c;
    localStorage.setItem('preferences.couleurFond', c);
    // this.myStorageUtilService.setItemInLocalStorage('preferences.couleurFond',c);
  }
  constructor() {

    setInterval ( ()=> { this.incrementerCompteur(); } , 1000); //déclenchement automatique d'un traitement toutes les 1000ms 

    //let c :string | null = this.myStorageUtilService.getItemInLocalStorage('preferences.couleurFond');
    let c = localStorage.getItem('preferences.couleurFond');
    this._couleurFondPreferee = c ? c : 'lightgrey';
  }
}
