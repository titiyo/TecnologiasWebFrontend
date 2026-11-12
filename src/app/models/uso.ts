// Forma del JSON que devuelve GET /usos y GET /usos/:id.
export interface Uso {
  id: number;
  nombre: string;
}

// Body de POST /usos y PATCH /usos/:id: el id lo genera la base, no se envía.
export interface UsoBody {
  nombre: string;
}
