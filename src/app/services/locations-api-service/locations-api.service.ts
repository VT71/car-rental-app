import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RentalLocation } from '../../interfaces/rental-location';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService {
  private apiUrl = `${environment.api.serverUrl}/Location`;

  private http = inject(HttpClient);

  getPickUpLocations(): Observable<RentalLocation[]> {
    return this.http.get<RentalLocation[]>(`${this.apiUrl}/PickUpLocations`);
  }

  getDropOffLocations(): Observable<RentalLocation[]> {
    return this.http.get<RentalLocation[]>(`${this.apiUrl}/DropOffLocations`);
  }
}
