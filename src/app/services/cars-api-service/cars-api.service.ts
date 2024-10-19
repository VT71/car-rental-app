import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../interfaces/car';

@Injectable({
    providedIn: 'root',
})
export class CarsApiService {
    private apiUrl = environment.api.serverUrl + '/Car';

    private http = inject(HttpClient);

    getAll(): Observable<Car[]> {
        return this.http.get<Car[]>(`${this.apiUrl}`);
    }

    getById(carId: number): Observable<Car> {
        return this.http.get<Car>(`${this.apiUrl}/${carId}`);
    }

    getAvailableCars(
        pickUpLocationId: number,
        dropOffLocationId: number,
        pickUpdateTime: string,
        dropOffDateTime: string
    ): Observable<Car[]> {
        return this.http.get<Car[]>(
            `${this.apiUrl}/${pickUpLocationId}/${dropOffLocationId}/${pickUpdateTime}/${dropOffDateTime}`
        );
    }
}
