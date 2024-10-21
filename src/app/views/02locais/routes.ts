import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listar-locais',
    loadComponent: () => import('./01Locais/listar-locais/listar-locais.component').then(m => m.ListarLocaisComponent),
    data: {
      title: `Locais / Listar Locais`
    }
  },
  {
    path: 'listar-departamentos',
    loadComponent: () => import('./02Departamentos/listar-departamentos/listar-departamentos.component').then(m => m.ListarDepartamentosComponent),
    data: {
      title: `Locais / Listar Departamentos`
    }
  }
];

