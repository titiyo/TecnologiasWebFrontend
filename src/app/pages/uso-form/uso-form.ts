import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Usos } from '../../services/usos';
import { mensajeDeError } from '../../utils/mensaje-error';

// El mismo formulario sirve para crear (/usos/nuevo) y para editar (/usos/:id/editar).
@Component({
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-uso-form',
  styleUrl: './uso-form.css',
  templateUrl: './uso-form.html',
})
export class UsoForm implements OnInit {
  private usosService = inject(Usos);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // id del uso que se edita; null si se está creando uno nuevo.
  protected id: number | null = null;

  // Enlazado al input con [(ngModel)].
  protected nombre = '';
  protected cargando = signal(false);
  protected guardando = signal(false);
  protected error = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = Number(id);
      this.cargando.set(true);
      this.usosService.getUso(this.id).subscribe({
        next: (uso) => {
          this.nombre = uso.nombre;
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
    const body = { nombre: this.nombre };
    const pedido = this.id
      ? this.usosService.actualizarUso(this.id, body)
      : this.usosService.crearUso(body);

    pedido.subscribe({
      next: () => {
        this.router.navigate(['/usos']);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(mensajeDeError(err));
        this.guardando.set(false);
      },
    });
  }
}
