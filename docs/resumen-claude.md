# Resumen de la sesión con Claude Code (frontend)

> Resumen del log completo [`docs/logs/claude-code-sesion-front.zip`](logs/claude-code-sesion-front.zip)
> (export de la sesión). El log llega hasta el momento de la exportación; lo que se conversó
> después no está en el zip.

## Datos de la sesión

| Dato | Valor |
|---|---|
| Herramienta | Claude Code (app de escritorio), con la skill `tp-tecnologias-web` v1.1.0 |
| Modelo | Claude Sonnet 5.5 al inicio; después el estudiante cambió la sesión a Claude Opus 5.5 |
| Período | 22/10/2026 al 25/11/2026 |
| Backend | [TecnologiasWebBackend](https://github.com/titiyo/TecnologiasWebBackend) (primera entrega) |

## Decisiones de diseño (tomadas por el estudiante)

La skill no deja elegir por el alumno: para cada decisión se le dieron 2 o 3 opciones.

| Decisión | Elección | Motivo |
|---|---|---|
| Versión de Angular | Angular actual (22), standalone y `@if`/`@for` | Elección del estudiante; se avisaron las diferencias con las slides (Angular 12) |
| Pantallas | `/componentes` y `/usos` con formulario aparte | El estudiante pidió la recomendada por la skill o, si no había, que eligiera el asistente |
| Estilos | Angular Material | Elección del estudiante |
| Formularios | Template-driven (`ngModel`) | Lo que enseña la cátedra y recomienda la skill |
| Deploy de Netlify | Configurado desde el panel, sin `netlify.toml` | El asistente había agregado un `netlify.toml` sin preguntar (contra la regla 8); el estudiante pidió hacerlo como dice la skill y se quitó |

## Quién escribió qué

La skill pide que las piezas nuevas (primer servicio, primer formulario y el `<select>` de la
relación) sean código del estudiante. El estudiante pidió hacerlo con **código parcial con huecos**
que él completaba; los patrones repetidos los generó el asistente.

| Pieza | Autor |
|---|---|
| Proyecto, Material, `environments`, rutas, menú | Asistente (operativo) |
| Interfaces `Uso` / `Componente` | Asistente, a pedido del estudiante, con checkpoint |
| `getUsos()` en el servicio de usos | **Estudiante** (completó huecos; corrigió `HttpClient` y el template string) |
| `subscribe` de la lista de usos | **Estudiante** (corrigió el uso de signals con `.set()`) |
| Formulario de alta de usos y `guardar()` | **Estudiante** (9 huecos, todos correctos) |
| Lista de componentes, filtros, editar/eliminar | Asistente (repite patrones ya explicados) |
| `<select>` de uso y preselección al editar | **Estudiante** (5 huecos; corrigió `uso.uso.id` → `uso.id`) |
| `mensajeDeError` (texto o array, y backend caído) | Asistente, a partir de la lógica del estudiante |
| README, `_redirects`, URLs de deploy | Asistente (operativo) |

## Checkpoints de comprensión

En cada uno se marcó lo que estaba mal y se pidió reformular antes de seguir.

1. **Interfaces.** Primer intento: decía que el body mandaba `id` y el objeto `uso`, y que el GET
   devolvía un entero. Corregido: el body no lleva `id` y manda `usoId` (número); el GET trae el
   `uso` embebido como objeto; `precio` llega como número por el `transformer` del backend.
2. **Asincronía.** Primer intento: "devuelve un observable, no una lista" (faltaba el porqué).
   Reformulado: HTTP es asíncrono, el método termina antes de que responda el backend y los datos
   llegan en el `subscribe`.
3. **Inyección de dependencias.** Confundía la dependencia (`HttpClient`) con el proveedor
   (`provideHttpClient()`). Reformulado: si se borra el proveedor compila igual, pero falla al
   ejecutar porque no hay nada registrado.
4. **Apagar `cargando` fuera del `subscribe`.** Correcto: se apaga antes de que lleguen los datos.
5. **Filtrar en el backend.** Primer intento hablaba de validación. Reformulado: por rendimiento,
   solo viajan los registros que cumplen el `WHERE`, y se usa el endpoint de la primera entrega.
6. **Formulario.** `invalid` y `touched`: hizo falta explicar por qué van juntos (sin `touched`
   el error se ve antes de escribir). El backend valida igual porque el `required` se saltea con
   F12 o Postman.
7. **Eliminar un uso con componentes.** Decía 502; corregido a 500 por la foreign key, y por eso el
   backend chequea antes y devuelve 409.
8. **`<select>` por id.** Con objetos, `===` compara referencias: dos objetos con los mismos datos
   pero de pedidos distintos no son iguales, y el select quedaría vacío al editar.

## Deploy

- **Backend en Render:** https://tecnologiaswebbackend.onrender.com (Web Service + PostgreSQL de
  Render por Internal Database URL; la base gratis vence el 25/12/2026).
- **Frontend en Netlify:** https://tecnologiaswebfrontend.netlify.app (publish `dist/front/browser`,
  `_redirects` en `public/`).
- **Problemas resueltos:**
  - Netlify publicaba `dist` en vez de `dist/front/browser`.
  - La app estaba privada (respondía 401) hasta que se hizo pública.
  - Un commit del select no compilaba (`.uso.nombre`) y se corrigió en commits siguientes.
- **Datos de producción:** se cargaron con la colección de Postman cambiando `baseUrl`.

## Verificación final

- CRUD completo probado en Netlify: crear, editar con el uso preseleccionado y eliminar.
  También se probaron el 409 al borrar un uso con componentes y la vista en celular.
- Contra Render, con `curl`:
  - Los GET de listado, por id, con filtro y con búsqueda devuelven 200.
  - Un id inválido, un filtro inválido y un body vacío devuelven 400.
  - Un uso inexistente devuelve 404.
- Refrescar en una ruta interna de Netlify no da 404.
- El build de producción no contiene `localhost`.

## Commits del frontend

| Commit | Descripción |
|---|---|
| `6732393` | Proyecto Angular con Material, environments e interfaces |
| `50f1429` | Servicio de usos con `getUsos` y `provideHttpClient` |
| `996ea18` | Lista de usos con estados de carga y error |
| `55cfc3c` | Servicio y lista de componentes con filtro y búsqueda |
| `7b8da63` | Formulario de alta de usos |
| `f3ef927` | Edición y eliminación de usos |
| `40392a7` | Formulario de componentes y preparación del deploy |
| `a094209` / `70546fa` | Se agregó y luego se quitó `netlify.toml` |
| `b56c7ae` | Producción apuntando a Render y URLs en el README |
| `c55b6ce` … `c521f9d` | Select de uso y sus correcciones |
