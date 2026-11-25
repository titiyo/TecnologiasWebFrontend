import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Componentes } from '../../services/componentes';
import { Usos } from '../../services/usos';
import { Uso } from '../../models/uso';
import { mensajeDeError } from '../../utils/mensaje-error';

// El mismo formulario sirve para crear (/componentes/nuevo) y editar (/componentes/:id/editar).
@Component({
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-componente-form',
  styleUrl: './componente-form.css',
  templateUrl: './componente-form.html',
})
export class ComponenteForm implements OnInit {
  private componentesService = inject(Componentes);
  private usosService = inject(Usos);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // id del componente que se edita; null si se está creando uno nuevo.
  protected id: number | null = null;

  // Campos del formulario, enlazados con [(ngModel)].
  protected nombre = '';
  protected tipo = '';
  protected marca = '';
  protected precio: number | null = null;
  protected usoId: number | null = null;

  // Opciones del <select> de uso.
  protected usos = signal<Uso[]>([]);
  protected cargando = signal(false);
  protected guardando = signal(false);
  protected error = signal('');

  ngOnInit() {
    // Los usos se cargan siempre: hacen falta para elegir el uso al crear y al editar.
    this.usosService.getUsos().subscribe({
      next: (usos) => this.usos.set(usos),
      error: (err: HttpErrorResponse) => this.error.set(mensajeDeError(err)),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = Number(id);
      this.cargando.set(true);
      this.componentesService.getComponente(this.id).subscribe({
        next: (componente) => {
          this.nombre = componente.nombre;
          this.tipo = componente.tipo;
          this.marca = componente.marca;
          this.precio = componente.precio;
          this.usoId = componente.uso.id;   // 5
          this.cargando.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.error.set(mensajeDeError(err));
          this.cargando.set(false);
        },
      });
    }
  }

  protected guardar() {
    this.guardando.set(true);
    this.error.set('');
    const body = {
      nombre: this.nombre,
      tipo: this.tipo,
      marca: this.marca,
      precio: this.precio!,
      usoId: this.usoId!,
    };
    const pedido = this.id
      ? this.componentesService.actualizarComponente(this.id, body)
      : this.componentesService.crearComponente(body);

    pedido.subscribe({
      next: () => {
        this.router.navigate(['/componentes']);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(mensajeDeError(err));
        this.guardando.set(false);
      },
    });
  }
}
