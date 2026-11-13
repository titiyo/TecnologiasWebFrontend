import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Usos } from '../../services/usos';
import { Uso } from '../../models/uso';
import { mensajeDeError } from '../../utils/mensaje-error';

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
  // Error de una acción (ej. eliminar): se muestra arriba de la tabla sin ocultarla.
  protected errorAccion = signal('');
  protected columnas = ['id', 'nombre', 'acciones'];

  ngOnInit() {
    this.cargar();
  }

  private cargar() {
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

  protected eliminar(uso: Uso) {
    if (!confirm(`¿Eliminar el uso "${uso.nombre}"?`)) {
      return;
    }
    this.errorAccion.set('');
    this.usosService.eliminarUso(uso.id).subscribe({
      next: () => this.cargar(),
      error: (err: HttpErrorResponse) => this.errorAccion.set(mensajeDeError(err)),
    });
  }
}
