import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CostoAvicola } from '../models/costoAvicola.model';
import { catchError } from 'rxjs/operators';
import { Ave } from '../models/ave.model';

@Injectable({
  providedIn: 'root'
})
export class CostoAvicolaService {

  url: string = `${environment.host}:${environment.port}/monitor/costoavicola`;  
  constructor(private http: HttpClient) {

  }

   getCostoAvicola(): Observable<Array<CostoAvicola>> {
    return this.http.get<Array<CostoAvicola>>(this.url)
    .pipe(
      catchError(this.handleError<CostoAvicola[]>('CostoAvicola', []))
    );
  }


  getAve(): Observable<Array<Ave>> {
    return this.http.get<Array<Ave>>(`${environment.host}:${environment.port}/monitor/ave`)
    .pipe(
      catchError(this.handleError<Ave[]>('getAve', []))
    );
  }

  createCostoAvicola(data): Observable<CostoAvicola> {  
    return this.http.post<CostoAvicola>(this.url, data).pipe(response => response);
  }

  

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); // log to console instead
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}


private log(message: string) {
  console.log("Personal: " + message);
}
}
