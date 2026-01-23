import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-simple-selector',
  imports: [],
  templateUrl: './simple-selector.component.html',
  styleUrl: './simple-selector.component.scss',
})
export class SimpleSelectorComponent {
   title = input("title");
   values = input<string[]>([]);
   choix=model<string>("?");

   onInternalChoice(choice : string){
     this.choix.set(choice)
   }
}
