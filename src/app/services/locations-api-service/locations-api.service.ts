import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService {
  private apiUrl = `${environment.api.serverUrl}/Location`;

  private http = inject(HttpClient);

  getPickUpLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/PickUpLocations`);
  }

  getDropOffLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/DropOffLocations`);
  }
}
