import { Routes } from '@angular/router';
import { UsosLista } from './pages/usos-lista/usos-lista';
import { ComponentesLista } from './pages/componentes-lista/componentes-lista';

export const routes: Routes = [
  { path: '', redirectTo: 'componentes', pathMatch: 'full' },
  { path: 'componentes', component: ComponentesLista },
  { path: 'usos', component: UsosLista },
];
