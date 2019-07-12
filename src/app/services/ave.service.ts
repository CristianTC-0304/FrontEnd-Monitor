import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable,of  } from 'rxjs';
import { Ave } from '../models/ave.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AveService {

  url: string = `${environment.host}:${environment.port}/monitor/ave`;
  constructor(private http: HttpClient) {

  }

  getAve(): Observable<Array<Ave>> {
    return this.http.get<Array<Ave>>(this.url)
    .pipe(
      catchError(this.handleError<Ave[]>('Ave', []))
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
