import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UnidadMedida } from '../models/unidadMedida.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  url: string = `${environment.host}/monitor/medida`;
  constructor(private http: HttpClient) {

  }

  getUnidadMedida(): Observable<Array<UnidadMedida>> {
    return this.http.get<Array<UnidadMedida>>(this.url)
    .pipe(
      catchError(this.handleError<UnidadMedida[]>('UnidadMedida', []))
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
