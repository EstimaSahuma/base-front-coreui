import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './services/auth.guard' // Importando o AuthGuard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard], // Protegendo as rotas
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'equipamentos',
        loadChildren: () => import('./views/01equipamentos/routes').then((m) => m.routes)
      },
      {
        path: 'locais',
        loadChildren: () => import('./views/02locais/routes').then((m) => m.routes)
      },
      {
        path: 'configuracoes',
        loadChildren: () => import('./views/03configuracoes/routes').then((m) => m.routes)
      },
      {
        path: 'control-acesso',
        loadChildren: () => import('./views/04controldeacesso/routes').then((m) => m.routes)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
