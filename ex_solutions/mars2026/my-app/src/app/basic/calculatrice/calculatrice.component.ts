import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-calculatrice',
  imports: [FormsModule, JsonPipe],
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.css']
})
export class CalculatriceComponent {
  modeChoisi = "simple" //ou "sophistiquee"

  a: number = 0;
  b: number = 0;
  //res: number = 0;
  sRes = signal(0);
  montrerHisto: boolean = true;
  sHistoriqueCalculs = signal<string[]>([]);

  onCalculer(op: string) {
    switch (op) {
      case "+":
        // this.res = Number(this.a) + Number(this.b); break;
        this.sRes.set(Number(this.a) + Number(this.b)); break;
      case "-":
        // this.res = Number(this.a) - Number(this.b); break;
        this.sRes.set(this.a - this.b); break;
      case "*":
        // this.res = Number(this.a) * Number(this.b); break;
        this.sRes.set(this.a * this.b); break;
      default:
        //this.res = 0;
        this.sRes.set(0);
    }
    //this.historiqueCalculs.push(`${this.a} ${op} ${this.b} = ${this.res}`)
    this.sHistoriqueCalculs().push(`${this.a} ${op} ${this.b} = ${this.sRes()}`)  //ok ou pas ok selon contexte
  }
  //coordonnées relatives de la souris qui survole une div
  x: number = 0;
  y: number = 0;
  onMouseMove(evt: MouseEvent) {
    let currentDiv: HTMLElement = <HTMLElement>evt.target;
    this.x = evt.pageX - currentDiv.offsetLeft;
    this.y = evt.pageY - currentDiv.offsetTop;
  }
  onMouseLeave(evt: MouseEvent) {
    this.x = 0; this.y = 0;
  }
  
  constructor(route: ActivatedRoute) {
    //NB: { path: 'calculatrice/:mode', ... },
    route.params.subscribe(
      (params: Params) => { this.modeChoisi = params['mode']; }
    );
  }
}
