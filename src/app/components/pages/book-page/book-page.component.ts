import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Car } from '../../../interfaces/car';
import { environment } from '../../../../environments/environment.development';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BookingsApiService } from '../../../services/bookings-api-service/bookings-api.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
    selector: 'app-book-page',
    standalone: true,
    imports: [AsyncPipe, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatButtonModule],
    templateUrl: './book-page.component.html',
    styleUrl: './book-page.component.css',
})
export class BookPageComponent implements OnInit, OnDestroy {
    private bookingsApiService = inject(BookingsApiService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private subscriptions: Subscription[] = [];

    public countries: string[] = [];
    public $car: Observable<Car> = of({
        id: 1,
        makeId: 1,
        make: {
            id: 1,
            name: 'Jeep',
            cars: [],
        },
        model: 'Wrangler',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        pictureUrl:
            'https://drive.google.com/thumbnail?id=1pXzXrCSDQZgwikd41iXOx1snt1CEVmqx',
        dayPrice: 80,
        deposit: 250,
        seats: 5,
        doors: 4,
        transmissionType: 0,
        powerHp: 280,
        rangeKm: 650,
        available: true,
        bookings: [],
    });

    public currencySign = environment.currency.sign;

    private formBuilder = inject(FormBuilder);
    public formGroup = this.formBuilder.group({
        driversFullName: ["", [Validators.required, Validators.min(3), Validators.max(255)]],
        driversAge: [null, [Validators.required, Validators.min(18)]],
        driversPhoneNo: ["", [Validators.required, Validators.min(6), Validators.max(20)]],
        driversEmail: ["", [Validators.required, Validators.email, Validators.max(255)]],
        driversAddress: ["", [Validators.required, Validators.min(3), Validators.max(255)]],
        driversPostcode: ["", [Validators.required, Validators.min(2), Validators.max(12)]],
        driversCountry: ["", [Validators.required]]
    })

    onEditSearch(): void {
        this.router.navigate(['/fleet'], { queryParams: this.route.snapshot.queryParams });
    }

    ngOnInit(): void {
        const countryValidator = (countries: string[]): ValidatorFn => {
            return (control: AbstractControl): ValidationErrors | null => {
                const validCountry = countries.includes(control.value);
                return validCountry ? null : { invalidCountry: { value: control.value } }
            }
        }

        this.subscriptions.push(this.bookingsApiService.getAllCountries().subscribe(countries => {
            this.countries = countries;
            this.formGroup.controls.driversCountry.addValidators(countryValidator(countries));
        }));
    }

    ngOnDestroy(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
}
