import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-simple-selector',
  imports: [],
  templateUrl: './simple-selector.component.html',
  styleUrl: './simple-selector.component.css',
})
export class SimpleSelectorComponent {
     title=input("titre");
    values=input<string[]>([]);
    //choix=output<string>(); // v1
    choix=model(""); //v2 

    selection="";//v1

    ngOnInit(){
      this.selection=this.choix(); //v2
    }
    

    onSelect(val:string){
      this.selection=val;
      //this.choix.emit(val);//v1
      this.choix.set(val); //v2
    }
}
