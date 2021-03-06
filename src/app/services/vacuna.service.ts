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

  url: string = `${environment.host}/monitor/productos/1`;  
  constructor(private http: HttpClient) {

  }

  getVacuna(): Observable<Array<Producto>> {
    return this.http.get<Array<Producto>>(this.url)
    .pipe(
      catchError(this.handleError<Producto[]>('getVacuna', []))
    );
  }

  getPresentacion(): Observable<Array<TipoProducto>> {
    return this.http.get<Array<TipoProducto>>(`${environment.host}/monitor/presentacion`)
    .pipe(
      catchError(this.handleError<TipoProducto[]>('getPresentacion', []))
    );
  }

  getVacunaId(id: number): Observable<Producto> {
    const url = `${environment.host}/monitor/product/${id}`;
    return this.http.get<Producto>(url).pipe(result => result);
  }

  createVacuna(data): Observable<Producto> {  
    const url = `${environment.host}/monitor/producto`
    return this.http.post<Producto>(url, data).pipe(response => response);
  }

  deleteVacuna(id): Observable<Producto> {
      const url = `${environment.host}/monitor/dtProducto/${id}`;
      return this.http.delete<Producto>(url).pipe(result => result);
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
