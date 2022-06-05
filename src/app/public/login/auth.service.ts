import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login, Token } from './auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private apiURL = "http://localhost:8000/auth/login";  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

 constructor(private httpClient: HttpClient) { }

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////LOS MÉTODOS PARA CREAR NAVES Y PILOTONAVE//////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////



  login(auth: Login): Observable<Token> {
    return this.httpClient.post<Token>(this.apiURL, JSON.stringify(auth), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }




/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////MANEJO DE ERRORES EN METODOS, SI SE ACTIVA, VA TODO MAL///////////////////
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



