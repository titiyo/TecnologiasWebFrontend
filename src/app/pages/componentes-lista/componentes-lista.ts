import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Componentes } from '../../services/componentes';
import { Usos } from '../../services/usos';
import { Componente } from '../../models/componente';
import { Uso } from '../../models/uso';
import { mensajeDeError } from '../../utils/mensaje-error';

@Component({
  imports: [
    CurrencyPipe,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  selector: 'app-componentes-lista',
  styleUrl: './componentes-lista.css',
  templateUrl: './componentes-lista.html',
})
export class ComponentesLista implements OnInit {
  private componentesService = inject(Componentes);
  private usosService = inject(Usos);

  protected componentes = signal<Componente[]>([]);
  protected usos = signal<Uso[]>([]);
  protected cargando = signal(true);
  protected error = signal('');
  // Error de una acción (ej. eliminar): se muestra arriba de la tabla sin ocultarla.
  protected errorAccion = signal('');
  // Error al cargar los usos del filtro: no debe ocultar la tabla de componentes.
  protected errorFiltro = signal('');
  protected columnas = ['nombre', 'tipo', 'marca', 'precio', 'uso', 'acciones'];

  // Valores de los filtros, enlazados con [(ngModel)].
  protected filtroUsoId: number | null = null;
  protected filtroNombre = '';

  ngOnInit() {
    // Los usos se cargan para llenar el <select> del filtro.
    this.usosService.getUsos().subscribe({
      next: (usos) => this.usos.set(usos),
      error: () => this.errorFiltro.set('No se pudieron cargar los usos para el filtro.'),
    });
    this.cargar();
  }

  // Pide el listado al backend con los filtros actuales.
  protected cargar() {
    this.cargando.set(true);
    this.error.set('');
    this.componentesService
      .getComponentes(this.filtroUsoId ?? undefined, this.filtroNombre)
      .subscribe({
        next: (componentes) => {
          this.componentes.set(componentes);
          this.cargando.set(false);
        },
        error: () => {
          this.error.set('Hubo un error al cargar los componentes. Intentá más tarde.');
          this.cargando.set(false);
        },
      });
  }

  protected limpiarFiltros() {
    this.filtroUsoId = null;
    this.filtroNombre = '';
    this.cargar();
  }

  protected eliminar(componente: Componente) {
    if (!confirm(`¿Eliminar el componente "${componente.nombre}"?`)) {
      return;
    }
    this.errorAccion.set('');
    this.componentesService.eliminarComponente(componente.id).subscribe({
      next: () => this.cargar(),
      error: (err: HttpErrorResponse) => this.errorAccion.set(mensajeDeError(err)),
    });
  }
}
