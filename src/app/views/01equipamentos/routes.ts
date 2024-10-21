import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listar-equipamentos',
    loadComponent: () => import('./01Equipamentos/listar-equipamentos/listar-equipamentos.component').then(m => m.ListarEquipamentosComponent),
    data: {
      title: `Equipamentos / Listar Equipamento`
    }
  },
  {
    path: 'historico-manutencao',
    loadComponent: () => import('./03HistoricoManutencao/listar-historico-manutencao/listar-historico-manutencao.component').then(m => m.ListarHistoricoManutencaoComponent),
    data: {
      title: `Equipamentos / Historico de Manutenção`
    }
  },
  {
    path: 'historico-descarte',
    loadComponent: () => import('./02HistoricoDescarte/listar-historico-descarte/listar-historico-descarte.component').then(m => m.ListarHistoricoDescarteComponent),
    data: {
      title: `Equipamentos / Historico de Descarte`
    }
  }
];

