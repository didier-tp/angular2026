import { Component } from '@angular/core';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TvaComponent } from './tva/tva.component';
import { TogglePanelComponent } from '../common/component/toggle-panel/toggle-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SimpleSelectorComponent } from '../common/component/simple-selector/simple-selector.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-basic',
  imports: [CalculatriceComponent , TvaComponent , TogglePanelComponent , SimpleSelectorComponent , MatTabsModule, RouterLink , RouterOutlet],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent {
  couleurChoisie = "blue" //default value
  
  onChoixCouleur(couleur:string){
    this.couleurChoisie=couleur;
  }
}
