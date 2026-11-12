import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Componente } from '../models/componente';

@Service()
export class Componentes {
  private http = inject(HttpClient);

  // GET /componentes con filtros opcionales: ?usoId=1&nombre=ryzen (se pueden combinar).
  getComponentes(usoId?: number, nombre?: string): Observable<Componente[]> {
    let params = new HttpParams();
    if (usoId) {
      params = params.set('usoId', usoId);
    }
    if (nombre?.trim()) {
      params = params.set('nombre', nombre.trim());
    }
    return this.http.get<Componente[]>(`${environment.apiUrl}/componentes`, { params });
  }
}
