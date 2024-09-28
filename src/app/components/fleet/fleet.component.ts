import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CarsApiService } from '../../services/cars-api-service/cars-api.service';
import { Observable } from 'rxjs';
import { Car } from '../../interfaces/car';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css',
})
export class FleetComponent implements OnInit {
  private carsApiService = inject(CarsApiService);

  public $apiCars!: Observable<Car[]>;

  ngOnInit() {
    this.$apiCars = this.carsApiService.getAll();
  }
}
