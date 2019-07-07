import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';
import { TipoProducto } from '../models/tipoProducto.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {

  url: string = `${environment.host}:${environment.port}/monitor/productos/1`;  
  constructor(private http: HttpClient) {

  }

  getVacuna(): Observable<Array<Producto>> {
    return this.http.get<Array<Producto>>(this.url)
    .pipe(
      catchError(this.handleError<Producto[]>('getVacuna', []))
    );
  }

  getPresentacion(): Observable<Array<TipoProducto>> {
    return this.http.get<Array<TipoProducto>>(`${environment.host}:${environment.port}/monitor/presentacion`)
    .pipe(
      catchError(this.handleError<TipoProducto[]>('getPresentacion', []))
    );
  }

  getVacunaId(id: number): Observable<Producto> {
    const url = `${this.url}/${id}`;
    return this.http.get<Producto>(url).pipe(
      tap(_ => this.log(`fetched alimento id=${id}`)),
      catchError(this.handleError<Producto>(`getStagetVacunaId id=${id}`))
    );
  }

  createVacuna(data): Observable<Producto> {  
    return this.http.post<Producto>(this.url, data).pipe(response => response);
  }

  deleteVacuna(id): Observable<Producto> {
      const url = `${this.url}/${id}`;
      return this.http.put<Producto>(url, {}).pipe(result => result);
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
