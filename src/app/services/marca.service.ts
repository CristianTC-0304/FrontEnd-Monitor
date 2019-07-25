import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/mark.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
    url: string = `${environment.host}/monitor/marca`;
    constructor(private http: HttpClient) {}

    getMarca(): Observable<Array<Marca>> {
        return this.http.get<Array<Marca>>(this.url).pipe(result => result); 
    }
 }