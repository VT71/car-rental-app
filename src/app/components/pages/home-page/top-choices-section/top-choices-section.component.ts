import { Component } from '@angular/core';
import { FleetComponent } from '../../../fleet/fleet.component';

@Component({
  selector: 'app-top-choices-section',
  standalone: true,
  imports: [FleetComponent],
  templateUrl: './top-choices-section.component.html',
  styleUrl: './top-choices-section.component.css',
})
export class TopChoicesSectionComponent {}
