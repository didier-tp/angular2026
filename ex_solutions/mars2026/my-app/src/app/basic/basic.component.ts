import { Component} from '@angular/core';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TvaComponent } from './tva/tva.component';
import { MutableComponent } from './mutable/mutable.component';
import { SimpleSelectorComponent } from '../common/component/simple-selector/simple-selector.component';
import { TogglePanelComponent } from '../common/component/toggle-panel/toggle-panel.component';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-basic',
  imports: [CalculatriceComponent,TvaComponent,MutableComponent,SimpleSelectorComponent,TogglePanelComponent,
    RouterLink,RouterOutlet
  ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent {
    couleurChoisie="red";
    panelCalculatriceOpenState=false;
    //utile que pour v1:
    onChoixCouleur(nouveauChoix: string){
      this.couleurChoisie=nouveauChoix;
    }
}
