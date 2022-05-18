import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Starship } from './starship';
import { Pilot } from './starship';
import { PilotShip } from './starship';

//SERVICIO STARSHIP QUE LLAMA A LOS MÉTODOS DEL BACK Y CONECTA CON ELLOS PARA RECIBIR Y MANDAR DATOS


@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  //ESTAS RUTAS CONTACTAN CON LARAVEL Y GENERAN JSONS DE SUS RESPECTIVOS DATOS
    //PRUEBA A METERLAS EN LA BARRA DE BUSQUEDA DEL NAVEGADOR PARA COMPROBAR QUE TODO VA OK Y VER
    //QUE DATOS DEVUELVE CADA UNA
  private apiURL = "http://localhost:8000/api/starship/";  
  private apiURL2 = "http://localhost:8000/api/pilot/";
  private apiURL3 = "http://localhost:8000/api/pilotShip/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

 constructor(private httpClient: HttpClient) { }

/////////////////////////////////////////////IMPORTANTE/////////////////////////////////////////////////
  // ESTOS SON LOS METODOS GET DE CADA ELEMENTO. LLAMANDO A LA RUTA DE CADA UNO, NOS PERMITE CREAR
  // OBJETOS DE ESA CATEGORIA QUE CONTIENEN UN JSON CON TODOS SUS DATOS PASADOS


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
////////////////METODO PARA ENCONTRAR NAVES PARTICULARES MEDIANTE SU ID///////////////////////////
////////////////////////////////ACTUALMENTE NO ESTA EN USO////////////////////////////////////////  


  find(id): Observable<Starship> {
    return this.httpClient.get<Starship>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }


//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////METODO PARA ACTUALIZACIÓN DE NAVES. RECOGE Y MANDA JSON///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////   


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



