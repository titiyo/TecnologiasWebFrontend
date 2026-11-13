import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Uso, UsoBody } from '../models/uso';

@Service()
export class Usos {
  private http = inject(HttpClient);

  getUsos(): Observable<Uso[]> {
    return this.http.get<Uso[]>(`${environment.apiUrl}/usos`);
  }

  // POST /usos: el backend responde 201 con el uso creado (ya con su id).
  crearUso(body: UsoBody): Observable<Uso> {
    return this.http.post<Uso>(`${environment.apiUrl}/usos`, body);
  }
}
