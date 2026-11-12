import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Uso } from '../models/uso';

@Service()
export class Usos {
  private http = inject(HttpClient);                     // 1

  getUsos(): Observable<Uso[]> {                    // 2
    return this.http.get<Uso[]>(`${environment.apiUrl}/usos`);    // 3
  }
}

