import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Uso, UsoBody } from '../models/uso';

@Service()
export class Usos {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/usos`;

  getUsos(): Observable<Uso[]> {
    return this.http.get<Uso[]>(this.url);
  }

  getUso(id: number): Observable<Uso> {
    return this.http.get<Uso>(`${this.url}/${id}`);
  }

  // POST /usos: el backend responde 201 con el uso creado (ya con su id).
  crearUso(body: UsoBody): Observable<Uso> {
    return this.http.post<Uso>(this.url, body);
  }

  actualizarUso(id: number, body: UsoBody): Observable<Uso> {
    return this.http.patch<Uso>(`${this.url}/${id}`, body);
  }

  // DELETE /usos/:id: 409 si el uso todavía tiene componentes.
  eliminarUso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
