# Componentes — Frontend

Frontend del TP de **Tecnologías Web** (TUARI/UNICEN). Aplicación en **Angular 22** con
**Angular Material** que consume la API REST del backend
([TecnologiasWebBackend](https://github.com/titiyo/TecnologiasWebBackend)) para administrar
componentes de PC agrupados por tipo de uso.

## Deploys

| Parte    | URL |
| -------- | --- |
| Frontend (Netlify) | https://tecnologiaswebfrontend.netlify.app |
| Backend (Render)   | https://tecnologiaswebbackend.onrender.com |

> El plan gratis de Render "duerme" el backend: la primera carga puede tardar cerca de un minuto.
> Mientras tanto la app muestra un indicador de carga.

## Funcionalidades

- **Usos**: listar, crear, editar y eliminar (si un uso tiene componentes, se muestra el error 409 del backend).
- **Componentes**: listar con su uso, filtrar por uso, buscar por nombre, crear, editar y eliminar.
  Al crear o editar, el uso se elige con un `<select>` cargado desde `GET /usos`.
- Validación de formularios (template-driven con `ngModel`) y mensajes de error del backend en pantalla.
- Diseño responsive.

## Rutas

| Ruta | Pantalla |
| ---- | -------- |
| `/componentes` | Lista de componentes con filtros |
| `/componentes/nuevo` | Alta de componente |
| `/componentes/:id/editar` | Edición de componente |
| `/usos` | Lista de usos |
| `/usos/nuevo` | Alta de uso |
| `/usos/:id/editar` | Edición de uso |

## Estructura

```
src/app/
├── models/      Interfaces Uso y Componente (lo que se recibe y lo que se envía)
├── services/    Servicios que hablan con la API (HttpClient)
├── pages/       Pantallas: listas y formularios
└── utils/       mensajeDeError: convierte un error HTTP en un texto legible
```

## Correrlo localmente

Requiere el backend corriendo en `http://localhost:3000` (ver su README).

```bash
npm install
npx ng serve
```

Abrir `http://localhost:4200`.

La URL de la API sale de `src/environments/`: `environment.development.ts` (localhost, usado por
`ng serve`) y `environment.ts` (Render, usado por `ng build`).

## Deploy en Netlify

Configurado desde el panel de Netlify (Build settings):

- Build command: `npm run build`
- Publish directory: `dist/front/browser`
- `public/_redirects` (`/* /index.html 200`) evita el 404 al refrescar en una ruta interna.

## Autor

Benjamín Tiseira — Tecnologías Web, TUARI/UNICEN.
