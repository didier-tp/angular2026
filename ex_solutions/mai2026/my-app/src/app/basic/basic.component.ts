import { Component } from '@angular/core';
import { TvaComponent } from './tva/tva.component';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TogglePanelComponent } from '../common/component/toggle-panel/toggle-panel.component';
import { SimpleSelectorComponent } from '../common/component/simple-selector/simple-selector.component';

@Component({
  selector: 'app-basic',
  imports: [TvaComponent,CalculatriceComponent,TogglePanelComponent,SimpleSelectorComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent {
    couleurChoisie="?";
    onChoixCouleur(choix:string){
      this.couleurChoisie=choix; //event value
    }
}
