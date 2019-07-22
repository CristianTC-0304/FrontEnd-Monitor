import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Position } from '../models/position.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  url: string = `${environment.host}/monitor/cargo`;
  constructor(private http: HttpClient) {

  }

  getPosition(): Observable<Array<Position>> {
      return this.http.get<Array<Position>>(this.url).pipe(result => result);
  }
}
