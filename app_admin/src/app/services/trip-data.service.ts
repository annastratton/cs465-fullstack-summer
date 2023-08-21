import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  constructor(private http: HttpClient) {}

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http.get<Trip[]>(this.tripUrl)
      .pipe(catchError(this.handleErrorObservable));
  }

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.http.post<Trip>(this.tripUrl, formData)
      .toPromise()
      .catch(this.handleErrorPromise);
  }

  public getTrip(tripCode: string): Promise<Trip> {    
    console.log('Inside TripDataService#getTrip(tripCode)');    
    return this.http.get<Trip>(this.tripUrl + tripCode)      
      .toPromise()      
      .catch(this.handleErrorPromise);
  }

  public updateTrip(formData: Trip): Promise<Trip> {    
    console.log('Inside TripDataService#updateTrip');    
    console.log(formData);    
    return this.http.put<Trip>(this.tripUrl + formData.code, formData)      
      .toPromise()      
      .catch(this.handleErrorPromise); 
  }

  private handleErrorObservable(error: HttpErrorResponse): Observable<never> {
    console.error('Something has gone wrong', error);
    return throwError(error.message || 'Unknown error');
  }

  private handleErrorPromise(error: any): Promise<never> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
