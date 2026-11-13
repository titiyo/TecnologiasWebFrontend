import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Usos } from '../../services/usos';
import { Uso } from '../../models/uso';

@Component({
  imports: [MatTableModule, MatProgressSpinnerModule, MatButtonModule, RouterLink],
  selector: 'app-usos-lista',
  styleUrl: './usos-lista.css',
  templateUrl: './usos-lista.html',
})
export class UsosLista implements OnInit {
  private usosService = inject(Usos);

  protected usos = signal<Uso[]>([]);
  protected cargando = signal(true);
  protected error = signal('');
  protected columnas = ['id', 'nombre'];

  ngOnInit() {
    this.usosService.getUsos().subscribe({
      next: (usos) => {
        this.usos.set(usos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Hubo un error al cargar los datos. Intenta más tarde.');
        this.cargando.set(false);
      },
    });
  }
}
