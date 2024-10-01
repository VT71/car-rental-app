import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LocationsApiService } from '../../services/locations-api-service/locations-api.service';
import { combineLatest, forkJoin, from, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RentalLocation } from '../../interfaces/rental-location';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Input() showFormTitle!: boolean;

  private subscriptions: Subscription[] = [];

  private locationsApiService = inject(LocationsApiService);

  public $pickUpLocations: Observable<RentalLocation[]> =
    this.locationsApiService.getPickUpLocations();
  public $dropOffLocations: Observable<RentalLocation[]> =
    this.locationsApiService.getDropOffLocations();
  public $locationsData = forkJoin([
    this.$pickUpLocations,
    this.$dropOffLocations,
  ]);
  public locationsData!: RentalLocation[][];

  private formBuilder = inject(FormBuilder);
  public searchForm = this.formBuilder.group(
    {
      pickUpLocation: ['', [Validators.required]],
      dropOffLocation: ['', [Validators.required]],
      pickUpDateTime: ['', [Validators.required]],
      dropOffDateTime: ['', [Validators.required]],
    },
    { validators: this.datesValidator }
  );

  onSubmit() {
    console.log('FORM DATA: ' + JSON.stringify(this.searchForm.getRawValue()));
    if (this.searchForm.valid) {
      console.log('Form Valid');
    }
  }

  private datesValidator(control: AbstractControl): ValidationErrors | null {
    const pickUpDateTimeInput = control.get('pickUpDateTime');
    const pickUpDateTimeObject = new Date(pickUpDateTimeInput?.value);
    const dropOffDateTimeInput = control.get('dropOffDateTime');
    const dropOffDateTimeObject = new Date(dropOffDateTimeInput?.value);

    const todayDateTime = new Date();

    let errors = {
      pickUpDateTime: { error: false },
      dropOffDateTime: { error: false },
    };

    if (pickUpDateTimeObject < todayDateTime) {
      errors.pickUpDateTime = { error: true };
      control.get('pickUpDateTime')?.setErrors({ invalidDate: true });
    }

    if (dropOffDateTimeObject < pickUpDateTimeObject) {
      errors.dropOffDateTime = { error: true };
      control.get('dropOffDateTime')?.setErrors({ invalidDate: true });
    }

    return pickUpDateTimeObject < todayDateTime ||
      dropOffDateTimeObject < pickUpDateTimeObject
      ? null
      : { invalidDates: { value: control.value } };
  }

  private locationValidator(locations: RentalLocation[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      for (let location of locations) {
        if (location.id == control.value?.id) {
          return null;
        }
      }
      return { invalidLocation: { value: control.value } };
    };
  }

  ngOnInit() {
    this.subscriptions.push(
      this.$locationsData.subscribe((data) => {
        this.locationsData = data;
        this.searchForm
          .get('pickUpLocation')
          ?.addValidators(this.locationValidator(this.locationsData[0]));

        this.searchForm
          .get('dropOffLocation')
          ?.addValidators(this.locationValidator(this.locationsData[1]));

        this.searchForm.reset();
      })
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
