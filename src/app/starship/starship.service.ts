import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Starship } from './starship';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  private apiURL = "http://localhost:8000/api/starship/";  //EN MI MEJOR ENTENDIMIENTO ESTO ES LA RUTA QUE CONTACTA CON LARAVEL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

 constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Starship[]> {
    return this.httpClient.get<Starship[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(starship): Observable<Starship> {
    return this.httpClient.post<Starship>(this.apiURL, JSON.stringify(starship), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id): Observable<Starship> {
    return this.httpClient.get<Starship>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, starship): Observable<Starship> {
    return this.httpClient.put<Starship>(this.apiURL + id, JSON.stringify(starship), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Starship>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = 'De alguna manera la he amuñao';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}



