import { HttpErrorResponse } from '@angular/common/http';

// Convierte un error HTTP en un texto para mostrarle al usuario.
// El backend manda message como string o como array de strings (varios errores de validación).
export function mensajeDeError(err: HttpErrorResponse): string {
  // status 0: no hubo respuesta (backend caído, sin red o bloqueado por CORS).
  if (err.status === 0) {
    return 'No se pudo conectar con el servidor. Intentá más tarde.';
  }
  const mensaje = err.error?.message;
  if (Array.isArray(mensaje)) {
    return mensaje.join(', ');
  }
  return mensaje || 'Ocurrió un error inesperado.';
}
