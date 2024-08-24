import { Component } from '@angular/core';
import { IntroSectionComponent } from './intro-section/intro-section.component';
import { FleetComponent } from './fleet/fleet.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    IntroSectionComponent,
    FleetComponent,
    TestimonialsSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
