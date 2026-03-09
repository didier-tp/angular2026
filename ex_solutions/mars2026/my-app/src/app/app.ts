import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,FooterComponent,BasicComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
