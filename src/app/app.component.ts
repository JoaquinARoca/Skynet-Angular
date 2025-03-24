import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Solo dejamos RouterOutlet porque sí lo usamos en el HTML
    RouterOutlet 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'SKYNET';
  loggedin: boolean = false;

  getLoggedIn(loggedin: boolean) {
    this.loggedin = loggedin;
  }
}
