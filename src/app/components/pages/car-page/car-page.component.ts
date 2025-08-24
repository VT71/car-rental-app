import { Component } from '@angular/core';
import { CarMainInfoSectionComponent } from "./car-main-info-section/car-main-info-section.component";

@Component({
    selector: 'app-car-page',
    imports: [CarMainInfoSectionComponent],
    templateUrl: './car-page.component.html',
    styleUrl: './car-page.component.css'
})
export class CarPageComponent {

}
