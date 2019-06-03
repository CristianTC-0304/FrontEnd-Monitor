import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TipoDocumento } from '../models/documentType.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentTypeService {
    
  url: string = `${environment.host}:${environment.port}/monitor/tipodocumento`;
  constructor(private http: HttpClient) {

  }

  getDocumentType(): Observable<Array<TipoDocumento>> {
    return this.http.get<Array<TipoDocumento>>(this.url).pipe(response => response);
  }
}
