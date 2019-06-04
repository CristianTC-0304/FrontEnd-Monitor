import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Vacuna } from '../models/vacuna.model';
import { Presentacion } from '../models/presentacion.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {

  url: string = `${environment.host}:${environment.port}/monitor/vacuna`;  
  constructor(private http: HttpClient) {

  }

  getVacuna(): Observable<Array<Vacuna>> {
    return this.http.get<Array<Vacuna>>(this.url)
    .pipe(
      catchError(this.handleError<Vacuna[]>('getVacuna', []))
    );
  }

  getPresentacion(): Observable<Array<Presentacion>> {
    return this.http.get<Array<Presentacion>>(`${environment.host}:${environment.port}/monitor/presentacion`)
    .pipe(
      catchError(this.handleError<Presentacion[]>('getPresentacion', []))
    );
  }

  getVacunaId(id: number): Observable<Vacuna> {
    const url = `${this.url}/${id}`;
    return this.http.get<Vacuna>(url).pipe(
      tap(_ => this.log(`fetched alimento id=${id}`)),
      catchError(this.handleError<Vacuna>(`getStagetVacunaId id=${id}`))
    );
  }

  createVacuna(data): Observable<Vacuna> {    
    return this.http.post<Vacuna>(this.url, data).pipe(response => response);
  }

  deleteVacuna(id): Observable<Vacuna>{
      const url = `${this.url}/${id}`;
      return this.http.put<Vacuna>(url,{}).pipe(result => result);
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
