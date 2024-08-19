import { Component } from '@angular/core';
import { IntroSectionComponent } from './intro-section/intro-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroSectionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
