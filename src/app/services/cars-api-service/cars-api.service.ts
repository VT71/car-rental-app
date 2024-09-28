import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../interfaces/car';

@Injectable({
  providedIn: 'root',
})
export class CarsApiService {
  private apiUrl = environment.api.serverUrl;

  private http = inject(HttpClient);

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/Car`);
  }
}
