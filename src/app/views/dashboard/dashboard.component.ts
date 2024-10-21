import { Component, OnInit } from '@angular/core';

import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import {DashboardService} from './services/dashboard.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [WidgetsDropdownComponent]
})
export class DashboardComponent implements OnInit {
  estatistic:any;

  constructor(private dashboardService:DashboardService){

  }

  ngOnInit(): void {
    this.getData()
  }

  public getData() {
    this.dashboardService.list().subscribe(data => {
      this.estatistic = data;
    },
      error => {
        console.error('Erro ao buscar locais:', error);
      }
    );
  }
}
