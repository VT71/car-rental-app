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
import {
  combineLatest,
  concatMap,
  forkJoin,
  from,
  Observable,
  Subscription,
} from 'rxjs';
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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
    selector: 'app-search-form',
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
    styleUrl: './search-form.component.css'
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Input() type!: string;

  private route = inject(ActivatedRoute);

  private subscriptions: Subscription[] = [];

  private locationsApiService = inject(LocationsApiService);
  private router = inject(Router);

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
      pickUpLocation: [0, [Validators.required]],
      dropOffLocation: [0, [Validators.required]],
      pickUpDateTime: [new Date(), [Validators.required]],
      dropOffDateTime: [new Date(), [Validators.required]],
    },
    { validators: this.datesValidator }
  );

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

    if (pickUpDateTimeObject <= todayDateTime) {
      errors.pickUpDateTime = { error: true };
      control.get('pickUpDateTime')?.setErrors({ invalidDate: true });
    }

    if (dropOffDateTimeObject <= pickUpDateTimeObject) {
      errors.dropOffDateTime = { error: true };
      control.get('dropOffDateTime')?.setErrors({ invalidDate: true });
    }

    return pickUpDateTimeObject <= todayDateTime ||
      dropOffDateTimeObject <= pickUpDateTimeObject
      ? { invalidDates: { value: control.value } }
      : null;
  }

  private locationValidator(locations: RentalLocation[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      for (let location of locations) {
        if (location.id == control.value) {
          return null;
        }
      }
      return { invalidLocation: { value: control.value } };
    };
  }

  private initialiseForm() {
    this.subscriptions.push(
      this.$locationsData
        .pipe(
          concatMap((data) => {
            this.locationsData = data;
            this.searchForm
              .get('pickUpLocation')
              ?.addValidators(this.locationValidator(this.locationsData[0]));

            this.searchForm
              .get('dropOffLocation')
              ?.addValidators(this.locationValidator(this.locationsData[1]));

            this.searchForm.reset();
            return this.route.queryParamMap;
          })
        )
        .subscribe((queryParamMap) => {
          if (this.type === 'fleet') {
            const pickUpLocationId: string | null =
              queryParamMap.get('pickUpLocation');
            const dropOffLocationId: string | null =
              queryParamMap.get('dropOffLocation');
            const pickUpDateTime: string | null =
              queryParamMap.get('pickUpDateTime');
            const dropOffDateTime: string | null =
              queryParamMap.get('dropOffDateTime');

            if (pickUpLocationId !== null && !isNaN(Number(pickUpLocationId))) {
              this.searchForm
                .get('pickUpLocation')
                ?.setValue(Number(pickUpLocationId));
            }
            if (
              dropOffLocationId !== null &&
              !isNaN(Number(dropOffLocationId))
            ) {
              this.searchForm
                .get('dropOffLocation')
                ?.setValue(Number(dropOffLocationId));
            }

            if (
              pickUpDateTime !== null &&
              !isNaN(new Date(pickUpDateTime).valueOf())
            ) {
              this.searchForm
                .get('pickUpDateTime')
                ?.setValue(new Date(pickUpDateTime));
            }

            if (
              dropOffDateTime !== null &&
              !isNaN(new Date(dropOffDateTime).valueOf())
            ) {
              this.searchForm
                .get('dropOffDateTime')
                ?.setValue(new Date(dropOffDateTime));
            }
          }
        })
    );
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.router.navigate(['fleet'], {
        queryParams: {
          pickUpLocation: this.searchForm.get('pickUpLocation')?.value,
          dropOffLocation: this.searchForm.get('dropOffLocation')?.value,
          pickUpDateTime: this.searchForm.get('pickUpDateTime')?.value,
          dropOffDateTime: this.searchForm.get('dropOffDateTime')?.value,
        },
      });
    }
  }

  ngOnInit() {
    this.initialiseForm();
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
