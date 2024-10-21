import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listar-usuarios',
    loadComponent: () => import('./01Usuarios/listar-usuarios/listar-usuarios.component').then(m => m.ListarUsuariosComponent),
    data: {
      title: $localize`Control de Acesso / Listar Usuários`
    }
  },
  {
    path: 'listar-roles',
    loadComponent: () => import('./02Roles/listar-roles/listar-roles.component').then(m => m.ListarRolesComponent),
    data: {
      title: $localize`Control de Acesso / Listar Roles`
    }
  }
];

