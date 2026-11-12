import { Routes } from '@angular/router';
import { UsosLista } from './pages/usos-lista/usos-lista';

export const routes: Routes = [
  { path: '', redirectTo: 'usos', pathMatch: 'full' },
  { path: 'usos', component: UsosLista },
];
