import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
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
    //let c :string | null = this.myStorageUtilService.getItemInLocalStorage('preferences.couleurFond');
    let c = localStorage.getItem('preferences.couleurFond');
    this._couleurFondPreferee = c ? c : 'lightgrey';
  }
}
