import { Component, inject, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LocationsApiService } from '../../services/locations-api-service/locations-api.service';
import { combineLatest, forkJoin, from, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RentalLocation } from '../../interfaces/rental-location';

@Component({
  selector: 'app-search-form',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter(),
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  @Input() showFormTitle!: boolean;

  private locationsApiService = inject(LocationsApiService);

  public $pickUpLocations: Observable<RentalLocation[]> =
    this.locationsApiService.getPickUpLocations();
  public $dropOffLocations: Observable<RentalLocation[]> =
    this.locationsApiService.getDropOffLocations();
  public $locationsData = forkJoin([
    this.$pickUpLocations,
    this.$dropOffLocations,
  ]);
}
