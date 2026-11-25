import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Componente, ComponenteBody } from '../models/componente';

@Service()
export class Componentes {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/componentes`;

  // GET /componentes con filtros opcionales: ?usoId=1&nombre=ryzen (se pueden combinar).
  getComponentes(usoId?: number, nombre?: string): Observable<Componente[]> {
    let params = new HttpParams();
    if (usoId) {
      params = params.set('usoId', usoId);
    }
    if (nombre?.trim()) {
      params = params.set('nombre', nombre.trim());
    }
    return this.http.get<Componente[]>(this.url, { params });
  }

  getComponente(id: number): Observable<Componente> {
    return this.http.get<Componente>(`${this.url}/${id}`);
  }

  crearComponente(body: ComponenteBody): Observable<Componente> {
    return this.http.post<Componente>(this.url, body);
  }

  actualizarComponente(id: number, body: ComponenteBody): Observable<Componente> {
    return this.http.patch<Componente>(`${this.url}/${id}`, body);
  }

  eliminarComponente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
