import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Staff } from '../models/staff.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  url: string = `${environment.host}:${environment.port}/monitor/personal`;
  constructor(private http: HttpClient) {

  }

  getStaff(): Observable<Array<Staff>> {
    return this.http.get<Array<Staff>>(this.url)
    .pipe(
      catchError(this.handleError<Staff[]>('getStaff', []))
    );
  }

  getStaffId(id: number): Observable<Staff> {
    const url = `${this.url}/${id}`;
    return this.http.get<Staff>(url).pipe(
      tap(_ => this.log(`fetched staff id=${id}`)),
      catchError(this.handleError<Staff>(`getStaffId id=${id}`))
    );
  }

  createStaff(data): Observable<Staff> {
    console.log('data create Staff', data);
    return this.http.post<Staff>(this.url, data).pipe(response => response);
  }

  deleteStaff(id): Observable<Staff> {
    const url =  `${this.url}/${id}`;
    return this.http.put<Staff>(url, {}).pipe(result => result);
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
