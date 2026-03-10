import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '../common/service/preferences.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
    titre = input("titre par defaut") //vue interne (dans ce sous composant) comme un signal
    public preferencesService = inject(PreferencesService) ;
}
