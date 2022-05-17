import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Starship } from './starship';
import { Pilot } from './starship';
import { PilotShip } from './starship';


@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  private apiURL = "http://localhost:8000/api/starship/";  //EN MI MEJOR ENTENDIMIENTO ESTO ES LA RUTA QUE CONTACTA CON LARAVEL
  private apiURL2 = "http://localhost:8000/api/pilot/";
  private apiURL3 = "http://localhost:8000/api/pilotShip/";

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

  getPilot(): Observable<Pilot[]> {
    return this.httpClient.get<Pilot[]>(this.apiURL2)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getPilotShip(): Observable<PilotShip[]> {
    return this.httpClient.get<PilotShip[]>(this.apiURL3)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getPilotShipbyId(id_starship:number): Observable<PilotShip[]> {
    const url=`http://localhost:8000/api/starship/${id_starship}/pilots`;
    return this.httpClient.get<PilotShip[]>(url)
    .pipe(
      catchError(this.errorHandler)
    )
  }

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////LOS MÉTODOS PARA CREAR NAVES Y PILOTONAVE//////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////



  create(starship): Observable<Starship> {
    return this.httpClient.post<Starship>(this.apiURL, JSON.stringify(starship), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  createPilotShip(pilotship): Observable<PilotShip> {
    return this.httpClient.post<PilotShip>(this.apiURL3, JSON.stringify(pilotship), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////  


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


//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////LOS MÉTODOS PARA BORRAR NAVES Y PILOTONAVE//////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
  


  delete(id){
    return this.httpClient.delete<Starship>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  deletePilotShip(id){
    return this.httpClient.delete<PilotShip>(this.apiURL3 + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


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



