import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Devise } from '../common/data/devise';
import { DeviseService } from '../common/service/devise.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversion',
  imports: [FormsModule],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css',
})
export class ConversionComponent {
  montant: number = 0;
  sCodeDeviseSource=signal<string>("?");
  sCodeDeviseCible=signal<string>("?");
  sMontantConverti=signal<number>(0);

  sListeDevises =signal<Devise[]>([]); //à choisir dans liste déroulante.

  private _deviseService =inject(DeviseService);

  onConvertir(){
        console.log(`debut de onConvertir: montant=${this.montant}  codeDeviseSource=${this.sCodeDeviseSource()} codeDeviseCible=${this.sCodeDeviseCible()}`)
        this._deviseService.convertir$(this.montant,
                                      this.sCodeDeviseSource(),
                                      this.sCodeDeviseCible())
                .subscribe({
                    next : (res :number) => { this.sMontantConverti.set(res);
                                      console.log(`resultat obtenu en différé: montantConverti=${this.sMontantConverti()} `);                    
                                  } ,
                    error : (err) => { console.log("error:"+err)}
                   });
        console.log("suite immédiate (sans attente) de onConvertir");
        //Attention : sur cette ligne , le résultat n'est à ce stade pas encore connu
        //car appel asynchrone non bloquant et réponse ultérieure via callback
  }

  initListeDevises(tabDevises : Devise[]){
    this.sListeDevises.set(tabDevises);
    if(tabDevises && tabDevises.length > 0){
      this.sCodeDeviseSource.set(tabDevises[0].code); //valeur par défaut
      this.sCodeDeviseCible.set(tabDevises[0].code); //valeur par défaut
    }
    console.log("initListeDevises: listeDevises=" +JSON.stringify(this.sListeDevises()) 
    + ` codeDeviseSource=${this.sCodeDeviseSource()} codeDeviseCible=${this.sCodeDeviseCible()}` );
  }

  //ngOnInit() est automatiquement appelée par le framework après le constructeur
  //et après la prise en compte des injections et des éventuels @Input
  ngOnInit(){
    this._deviseService.getAllDevises$()
         .subscribe({
            next: (tabDev : Devise[])=>{ this.initListeDevises(tabDev); },
            error: (err) => { console.log("error:"+err)}
         });
  }
}
