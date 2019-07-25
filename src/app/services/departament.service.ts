import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Departament } from '../models/departament.model';

@Injectable({
    providedIn: 'root'
})
export class DepartamentService {
    url: string = `${environment.host}/monitor/departamento`;

    constructor(private http: HttpClient) {

    }

    getDepartament(): Observable<Array<Departament>> {
        return this.http.get<Array<Departament>>(this.url).pipe(response => response);
    }
}