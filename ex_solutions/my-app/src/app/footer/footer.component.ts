import { Component, inject } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../common/service/session.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [FormsModule,JsonPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
listeCouleurs : string[] = [ "lightyellow", "white",
     "lightgrey" , "lightgreen" , "lightpink" , "lightblue"] ; 

  //injection moderne via inject()
  public preferencesService = inject(PreferencesService) ;
  public sessionService = inject(SessionService);
}
