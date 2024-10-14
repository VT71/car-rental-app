import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookingsApiService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.api.serverUrl}/Booking`

    constructor() { }

    public getAllCountries(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/countries`)
    }
}
