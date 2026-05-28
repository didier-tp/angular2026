import { Component } from '@angular/core';
import { BorderOverDirective } from '../common/directive/border-over';

@Component({
  selector: 'app-welcome',
  imports: [BorderOverDirective],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {

}
