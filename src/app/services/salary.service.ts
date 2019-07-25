import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Staff } from '../models/staff.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Salary } from '../models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  url: string = `${environment.host}/monitor/salario`;
  constructor(private http: HttpClient) {

  }

  getSalary(): Observable<Array<Salary>> {
    return this.http.get<Array<Salary>>(this.url)
      .pipe(
        catchError(this.handleError<Salary[]>('getSalary', []))
      );
  }

  getSalaryId(id: number): Observable<Salary> {
    const url = `${this.url}/${id}`;
    return this.http.get<Salary>(url).pipe(
      tap(_ => this.log(`fetched staff id=${id}`)),
      catchError(this.handleError<Salary>(`getSalaryId id=${id}`))
    );
  }

  createSalary(data): Observable<Salary> {
    console.log('data create Salary', data);
    return this.http.post<Salary>(this.url, data).pipe(response => response);
  }

  deleteSalary(id): Observable<Salary> {
    const url = `${this.url}/${id}`;
    return this.http.put<Salary>(url, {}).pipe(result => result);
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