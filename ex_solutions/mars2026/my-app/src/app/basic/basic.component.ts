import { Component, signal } from '@angular/core';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TvaComponent } from './tva/tva.component';
import { MutableComponent } from './mutable/mutable.component';



@Component({
  selector: 'app-basic',
  imports: [CalculatriceComponent,TvaComponent,MutableComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent {


}
