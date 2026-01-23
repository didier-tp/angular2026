import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '../common/service/preferences.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
   titre = input("titre")
   public preferencesService = inject(PreferencesService) ;
}
