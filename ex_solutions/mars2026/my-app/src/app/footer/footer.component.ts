import { Component, inject } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
    public preferencesService = inject(PreferencesService) ;
    listeCouleurs : string[] = [ "lightyellow", "white",
                          "lightgrey" , "lightgreen" , "lightpink" , "lightblue"] ;
}
