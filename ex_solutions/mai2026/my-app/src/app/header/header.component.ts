import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  titre = input("titre_par_defaut");

}

/*
   input() est un cas particulier de signal()
   -----
   Vue externe (dans html du composant parent : <app-header titre="valeur_choisie"></app-header>
                                      ou bien  <app-header [titre]="variable_title_parent"></app-header>
                                      ou bien  <app-header [titre]="signal_title_parent()"></app-header>
*/
