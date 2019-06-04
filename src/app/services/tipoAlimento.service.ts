import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TipoAlimento } from '../models/tipoAlimento.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoAlimentoService {

  url: string = `${environment.host}:${environment.port}/monitor/tipoAlimento`;
  constructor(private http: HttpClient) {

  }

  getTipoAlimento(): Observable<Array<TipoAlimento>> {
    return this.http.get<Array<TipoAlimento>>(this.url)
    .pipe(
      catchError(this.handleError<TipoAlimento[]>('TipoAlimento', []))
    );
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
