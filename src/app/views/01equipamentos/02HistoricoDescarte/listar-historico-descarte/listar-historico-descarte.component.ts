

import { Component, OnInit } from '@angular/core';
import {
  ColComponent,
  RowComponent,
  DropdownModule,
  CardModule,
  ButtonModule,
  ButtonGroupModule,
  ModalService,
  TableModule
} from '@coreui/angular';
import { IconComponent } from '@coreui/icons-angular';

import { DescarteEquipamentosService } from '../../services/descarte_equipamento.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Pagination } from '../../../shared/models/pagination';
import { Filter } from '../../../shared/models/Filters/Filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-listar-historico-descarte',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ButtonGroupModule,
    CardModule,
    ColComponent,
    RowComponent,
    IconComponent,
    DropdownModule,
    SpinnerComponent,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-historico-descarte.component.html',
  styleUrl: './listar-historico-descarte.component.scss'
})
export class ListarHistoricoDescarteComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter();
  public subjectObj = new Subject<number>();

  public departamentos: any[] = [];
  public historicos: any[] = []
  public equipamento: any
  public loading: boolean = false

  constructor(
    private modalService: ModalService,
    private descarteEquipamentosService: DescarteEquipamentosService
  ) { }

  ngOnInit(): void {
    this.listarEquipamentos()
  }

  launchModal() {
    this.modalService.toggle({ show: true, id: 'modalAddOrEditEquipamento' });
  }

  IsEmpty() {
    return this.pagination.total == 0;
  }

  public listarEquipamentos() {

    this.loading = true
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", ((this.filter.search) || '').toString())
      .set("isPaginate", "1");

    this.descarteEquipamentosService.list(httpParams).subscribe(data => {
      this.historicos = data.data;
      this.pagination.page = data.current_page;
      this.pagination.perPage = data.per_page;
      this.pagination.lastPage = data.last_page;
      this.pagination.total = data.total;
      this.loading = false
    },
      error => {
        console.error('Erro ao buscar equipamentos:', error);
      }
    );
  }

  setData(data: any) {
    this.equipamento = data
  }

  public getPageFilterData(page: number) {
    this.pagination.page = page;
    this.listarEquipamentos()
  }
}