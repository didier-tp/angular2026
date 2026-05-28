import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-toggle-panel',
  imports: [],
  templateUrl: './toggle-panel.component.html',
  styleUrl: './toggle-panel.component.css',
})
export class TogglePanelComponent {
   panelOpenState=model(false);
   title  = input( 'default panel title' );
}

