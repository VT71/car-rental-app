import { Component, inject } from '@angular/core';
import { FleetComponent } from '../../../fleet/fleet.component';
import { CarsApiService } from '../../../../services/cars-api-service/cars-api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-top-choices-section',
  standalone: true,
  imports: [FleetComponent, AsyncPipe],
  templateUrl: './top-choices-section.component.html',
  styleUrl: './top-choices-section.component.css',
})
export class TopChoicesSectionComponent {
  private carsApiService = inject(CarsApiService);

  public $cars = this.carsApiService.getAll();
}
