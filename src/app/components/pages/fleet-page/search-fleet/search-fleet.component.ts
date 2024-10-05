import { Component, inject, OnInit } from '@angular/core';
import { SearchFormComponent } from '../../../search-form/search-form.component';
import { FleetComponent } from '../../../fleet/fleet.component';
import { CarsApiService } from '../../../../services/cars-api-service/cars-api.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap, Observable, of } from 'rxjs';
import { Car } from '../../../../interfaces/car';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-fleet',
  standalone: true,
  imports: [SearchFormComponent, FleetComponent, AsyncPipe],
  templateUrl: './search-fleet.component.html',
  styleUrl: './search-fleet.component.css',
})
export class SearchFleetComponent implements OnInit {
  private carsApiService = inject(CarsApiService);
  private activatedRoute = inject(ActivatedRoute);

  public $carsData!: Observable<Car[]>;

  ngOnInit(): void {
    this.$carsData = this.activatedRoute.queryParamMap.pipe(
      concatMap((queryMap) => {
        let pickUpLocationIdStr = queryMap.get('pickUpLocation');
        let dropOffLocationIdStr = queryMap.get('dropOffLocation');
        let pickUpDateTimeIdStr = queryMap.get('pickUpDateTime');
        let dropOffDateTimeStr = queryMap.get('dropOffDateTime');
        if (
          pickUpLocationIdStr &&
          dropOffLocationIdStr &&
          pickUpDateTimeIdStr &&
          dropOffDateTimeStr
        ) {
          let pickUpLocationId = parseInt(pickUpLocationIdStr, 10);
          let dropOffLocationId = parseInt(dropOffLocationIdStr, 10);
          let pickUpDateTime = Date.parse(pickUpDateTimeIdStr);
          let dropOffDateTime = Date.parse(dropOffDateTimeStr);

          if (
            pickUpLocationId &&
            dropOffLocationId &&
            pickUpDateTime &&
            dropOffDateTime
          ) {
            return this.carsApiService.getAvailableCars(
              pickUpLocationId,
              dropOffLocationId,
              new Date(pickUpDateTime).toISOString(),
              new Date(dropOffDateTime).toISOString()
            );
          }
        }
        return of([]);
      })
    );
  }
}
