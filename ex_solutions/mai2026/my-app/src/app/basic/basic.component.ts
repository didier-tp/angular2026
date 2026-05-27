import { Component } from '@angular/core';
import { TvaComponent } from './tva/tva.component';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';

@Component({
  selector: 'app-basic',
  imports: [TvaComponent,CalculatriceComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent {

}
