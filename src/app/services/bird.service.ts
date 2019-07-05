import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Bird } from '../models/bird.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class BirdService {
  url: string = `${environment.host}:${environment.port}/monitor/ave`;
  constructor(private http : HttpClient) {

  }

  getBird(): Observable<Array<Bird>> {
    return this.http.get<Array<Bird>>(this.url)
      .pipe(
        catchError(this.handleError<Bird[]>('getSalary', []))
      );
  }

  createBird(data): Observable<Bird> {
    console.log('data create Bird', data);
    return this.http.post<Bird>(this.url, data).pipe(response => response);
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


  private log(Message: string) {
    console.log("Personal: " + Message);
  }

}
