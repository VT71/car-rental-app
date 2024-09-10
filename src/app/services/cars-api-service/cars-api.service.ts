import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsApiService {
  private apiUrl = environment.api.serverUrl;

  private http = inject(HttpClient);

  getIp(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Car`); // Assuming the endpoint is /ip
  }
}
