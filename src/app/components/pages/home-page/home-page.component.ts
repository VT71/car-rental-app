import { Component } from '@angular/core';
import { IntroSectionComponent } from './intro-section/intro-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { FleetComponent } from '../../fleet/fleet.component';
import { TopChoicesSectionComponent } from './top-choices-section/top-choices-section.component';

@Component({
    selector: 'app-home-page',
    imports: [
        IntroSectionComponent,
        TopChoicesSectionComponent,
        TestimonialsSectionComponent,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent {}
