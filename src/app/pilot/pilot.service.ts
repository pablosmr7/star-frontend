import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Pilot } from './pilot';



@Injectable({
  providedIn: 'root'
})


export class PilotService {

  private apiURL = "http://localhost:8000/pilot/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  constructor(private httpClient: HttpClient) { }



  getAll(): Observable<Pilot[]> {
    return this.httpClient.get<Pilot[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(pilot): Observable<Pilot> {
    return this.httpClient.post<Pilot>(this.apiURL, JSON.stringify(pilot), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id): Observable<Pilot> {
    return this.httpClient.get<Pilot>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  update(id, pilot): Observable<Pilot> {
    return this.httpClient.put<Pilot>(this.apiURL + id, JSON.stringify(pilot), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  delete(id){
    return this.httpClient.delete<Pilot>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }






  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
