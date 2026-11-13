import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Usos } from '../../services/usos';

@Component({
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-uso-form',
  styleUrl: './uso-form.css',
  templateUrl: './uso-form.html',
})
export class UsoForm {
  private usosService = inject(Usos);
  private router = inject(Router);

  // Enlazado al input con [(ngModel)].
  protected nombre = '';
  protected guardando = signal(false);
  protected error = signal('');

  protected guardar() {
    this.guardando.set(true);
    this.error.set('');
    this.usosService.crearUso({ nombre: this.nombre }).subscribe({     // 6
      next: () => {
        this.router.navigate(['/usos']);                              // 7
      },
      error: (err: HttpErrorResponse) => {
        const mensaje = err.error.message;                              // 8
        this.error.set(Array.isArray(mensaje) ? mensaje.join(', ') : mensaje);
        this.guardando.set(false);                                    // 9
      },
    });
  }
}
