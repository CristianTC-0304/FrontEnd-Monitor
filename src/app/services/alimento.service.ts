import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Alimento } from '../models/alimento.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  url: string = `${environment.host}:${environment.port}/monitor/alimento`;
  constructor(private http: HttpClient) {

  }

  getAlimento(): Observable<Array<Alimento>> {
    return this.http.get<Array<Alimento>>(this.url)
    .pipe(
      catchError(this.handleError<Alimento[]>('getAlimento', []))
    );
  }

  getAlimentoId(id: number): Observable<Alimento> {
    const url = `${this.url}/${id}`;
    return this.http.get<Alimento>(url).pipe(
      tap(_ => this.log(`fetched alimento id=${id}`)),
      catchError(this.handleError<Alimento>(`getStagetAlimentoId id=${id}`))
    );
  }

  createAlimento(data): Observable<Alimento> {    
    return this.http.post<Alimento>(this.url, data).pipe(response => response);
  }

  deleteAlimento(id): Observable<Alimento>{
      const url = `${this.url}/${id}`;
      return this.http.put<Alimento>(url,{}).pipe(result => result);
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
