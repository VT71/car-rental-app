import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CarsApiService } from '../../services/cars-api-service/cars-api.service';
import { Observable } from 'rxjs';
import { Car } from '../../interfaces/car';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css',
})
export class FleetComponent {
  @Input() cars!: Car[];

  public currencySign = environment.currency.sign;
}
