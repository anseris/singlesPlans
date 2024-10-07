import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.routes').then(m => m.INICIO_ROUTES) },
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES) }
];
