import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'estados',
    loadComponent: () => import('./01estado/listar-estados/listar-estados.component').then(m => m.ListarEstadosComponent),
    data: {
      title: `Configurações / Listar Estados`
    }
  },
  {
    path: 'categorias',
    loadComponent: () => import('./02categoria/listar-categoria/listar-categoria.component').then(m => m.ListarCategoriaComponent),
    data: {
      title: `Configurações / Listar Categorias`
    }
  },
  {
    path: 'condicao',
    loadComponent: () => import('./03condicao/listar-condicao/listar-condicao.component').then(m => m.ListarCondicaoComponent),
    data: {
      title: `Configurações / Listar Condição`
    }
  },
    {
      path: 'tipo-equipamento',
      loadComponent: () => import('./04tipoEquipamento/listar-tipo-equipamento/listar-tipo-equipamento.component').then(m => m.ListarTipoEquipamentoComponent),
      data: {
        title: `Configurações / Listar Tipo de Equipamentos`
      }
    }
];

