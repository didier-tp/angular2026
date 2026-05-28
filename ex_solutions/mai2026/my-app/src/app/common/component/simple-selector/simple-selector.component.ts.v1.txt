import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-selector',
  imports: [FormsModule],
  templateUrl: './simple-selector.component.html',
  styleUrl: './simple-selector.component.css',
})
export class SimpleSelectorComponent {
    title = input("selector");

    values = input<string[]>([]);  //valeurs possibles (à choisir)
    choix = output<string>(); //évenement choix effectué

    sel:string=""; //sélection interne

    onSelection(){
        this.choix.emit(this.sel);
    }
}
