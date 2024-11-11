import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { MainUserComponent } from './layouts/main-user/main-user.component';
import { InicioComponent } from './layouts/main/pages/inicio/inicio.component';
import { UsuariosComponent } from './layouts/main-user/pages/usuarios/usuarios.component';
import { loginGuard } from './layouts/guards/login.guard';
import { MensajeSimpleComponent } from './layouts/main-user/pages/mensaje-simple/mensaje-simple.component';
import { TarjetasComponent } from './layouts/main-user/pages/admin/tarjetas/tarjetas.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  {
    path: '',
    component: MainComponent,
    children:[
        { path: 'inicio', loadChildren: () => import('./layouts/main/pages/inicio/inicio.routes').then(m => m.INICIO_ROUTES) },
    ]
   
  },
  {
    path: 'logado',
    component: MainUserComponent,
    children:[
        { path: 'inicio', component: InicioComponent },
        { path: 'usuarios',component: UsuariosComponent },
        { path: 'mensaje-simple',component: MensajeSimpleComponent },
        { path: 'admin-tarjetas',component: TarjetasComponent },
        // { path: 'logado/inicio', loadChildren: () => import('./layouts/main-user/pages/inicio/inicio.routes').then(m => m.INICIO_ROUTES_LOGGED) },
        // { path: 'logado/usuarios', loadChildren: () => import('./layouts/main-user/pages/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES_LOGADO) }
    ],
    canActivate: [loginGuard]
  },
  { path: 'login', loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent) },
  { path: 'nuevo-usuario', loadComponent: () => import('./auth/components/registro/registro.component').then(m => m.RegistroComponent) },
  { path: 'recuperar-contraseña', loadComponent: () => import('./auth/components/recover/recover.component').then(m => m.RecoverComponent) }

];
