import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavRailComponent } from './components/nav-rail/nav-rail.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavRailComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'car-rental-app';
}
