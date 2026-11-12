import { Uso } from './uso';

// Forma del JSON que devuelve GET /componentes y GET /componentes/:id (con su uso embebido).
export interface Componente {
  id: number;
  nombre: string;
  tipo: string;
  marca: string;
  precio: number;
  uso: Uso;
}

// Body de POST /componentes: la relación se manda como usoId, no como objeto uso.
export interface ComponenteBody {
  nombre: string;
  tipo: string;
  marca: string;
  precio: number;
  usoId: number;
}
