import { ChangeDetectorRef, Component, inject } from '@angular/core';
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

  private changeDetectorRef = inject(ChangeDetectorRef);

  montant: number = 0;
  codeDeviseSource: string = "?";
  codeDeviseCible: string = "?";
  montantConverti: number = 0;
  listeDevises: Devise[] = []; //à choisir dans liste déroulante.

  //constructor(private _deviseService: DeviseService) { }
   _deviseService=inject(DeviseService);

  onConvertir() {
    console.log("debut de onConvertir")
    this._deviseService.convertir$(this.montant,
      this.codeDeviseSource,
      this.codeDeviseCible)
      .subscribe({
        next
          : (res: number) => {
            this.montantConverti = res;
            this.changeDetectorRef.markForCheck();
            console.log("resultat obtenu en différé")
          },
        error: (err) => { console.log("error:" + err) }
      });
    console.log("suite immédiate (sans attente) de onConvertir");
    //Attention : sur cette ligne , le résultat n'est à ce stade pas encore connu
    //car appel asynchrone non bloquant et réponse ultérieure via callback
  }

  initListeDevises(tabDevises: Devise[]) {
    this.listeDevises = tabDevises;
    if (tabDevises && tabDevises.length > 0) {
      this.codeDeviseSource = tabDevises[0].code; //valeur par défaut
      this.codeDeviseCible = tabDevises[0].code; //valeur par défaut
    }
  }

  ngOnInit() {
    this._deviseService.getAllDevises$().subscribe({
      next:(tabDev: Devise[])=>{this.initListeDevises(tabDev); this.changeDetectorRef.markForCheck();},
      error: (err) => { console.log("error:" + err) }
    })
  }
}
