import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Staff } from '../models/staff.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Graphif } from '../models/graphif.model';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class GraphifService {
  

  url: string = `${environment.host}:${environment.port}/monitor/nodos`;
  constructor(private http: HttpClient, private db: AngularFireDatabase) {

  }

  getDataGraphif(): Observable<Array<Graphif>> {
    return this.http.get<Array<Graphif>>(this.url).pipe(result => result);
  }

  getData() {
    return this.db.list('/monitor', ref => ref.limitToFirst(100)).valueChanges()
  }

}
