import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavRailComponent } from './components/nav-rail/nav-rail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavRailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'car-rental-app';
}
