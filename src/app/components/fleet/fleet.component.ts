import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CarsApiService } from '../../services/cars-api-service/cars-api.service';
import { Observable, Subscription } from 'rxjs';
import { Car } from '../../interfaces/car';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-fleet',
    imports: [AsyncPipe, RouterLink],
    templateUrl: './fleet.component.html',
    styleUrl: './fleet.component.css'
})
export class FleetComponent {
    @Input() cars!: Car[];
    @Input() type!: string;

    private route = inject(ActivatedRoute);
    private router = inject(Router);

    public currencySign = environment.currency.sign;

    bookHandler(carId: number) {
        this.router.navigate(['/book', carId], { queryParams: this.route.snapshot.queryParams })
    }

}
