import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
 
  {
    name: 'OPÇÕES',
    title: true
  },
  {
    name: 'Equipamentos',
    url: '/equipamentos',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Listar Equipamentos',
        url: '/equipamentos/listar-equipamentos',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Histórico de Manutenção',
        url: '/equipamentos/historico-manutencao',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Histórico de Descarte',
        url: '/equipamentos/historico-descarte',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Locais',
    url: '/locais',
    iconComponent: { name: 'cil-home' },
    children: [
      {
        name: 'Listar Locais',
        url: '/locais/listar-locais',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Listar Departamentos',
        url: '/locais/listar-departamentos',
        icon: 'nav-icon-bullet'
      },
    ]
  },

  {
    name: 'Configurações',
    url: '/configuracoes',
    iconComponent: { name: 'cilSettings' },
    children: [
      {
        name: 'Listar Tipo Equipamentos',
        url: '/configuracoes/tipo-equipamento',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Listar Categoria',
        url: '/configuracoes/categorias',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Listar Condição',
        url: '/configuracoes/condicao',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Listar Estados',
        url: '/configuracoes/estados',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Controlo de Acesso',
    url: '/control-acesso',
    iconComponent: { name: 'cilLockLocked' },
    children: [
      {
        name: 'Listar Usuários',
        url: '/control-acesso/listar-usuarios',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Listar Roles',
        url: '/control-acesso/listar-roles',
        icon: 'nav-icon-bullet'
      }
    ]
  },
];
