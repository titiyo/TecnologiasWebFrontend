import { Routes } from '@angular/router';
import { UsosLista } from './pages/usos-lista/usos-lista';
import { UsoForm } from './pages/uso-form/uso-form';
import { ComponentesLista } from './pages/componentes-lista/componentes-lista';
import { ComponenteForm } from './pages/componente-form/componente-form';

export const routes: Routes = [
  { path: '', redirectTo: 'componentes', pathMatch: 'full' },
  { path: 'componentes', component: ComponentesLista },
  { path: 'componentes/nuevo', component: ComponenteForm },
  { path: 'componentes/:id/editar', component: ComponenteForm },
  { path: 'usos', component: UsosLista },
  { path: 'usos/nuevo', component: UsoForm },
  { path: 'usos/:id/editar', component: UsoForm },
];
