import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CarsApiService } from '../../services/cars-api-service/cars-api.service';
import { Observable, Subscription } from 'rxjs';
import { Car } from '../../interfaces/car';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-fleet',
    standalone: true,
    imports: [AsyncPipe, RouterLink],
    templateUrl: './fleet.component.html',
    styleUrl: './fleet.component.css',
})
export class FleetComponent implements OnDestroy {
    @Input() cars!: Car[];
    @Input() type!: string;

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private subscriptions: Subscription[] = [];

    public currencySign = environment.currency.sign;

    bookHandler(carId: number) {
        this.subscriptions.push(this.route.queryParamMap.subscribe(queryParams => {
            if (queryParams.get("pickUpLocation") && queryParams.get("dropOffLocation") && queryParams.get("pickUpDateTime") && queryParams.get("dropOffDateTime")) {
                this.router.navigateByUrl(`/book/${carId}?pickUpLocation=${queryParams.get("pickUpLocation")}&dropOffLocation=${queryParams.get("dropOffLocation")}&pickUpDateTime=${queryParams.get("pickUpDateTime")}&dropOffDateTime=${queryParams.get("dropOffDateTime")}`);
            }
        }));
    }

    ngOnDestroy(): void {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

}
