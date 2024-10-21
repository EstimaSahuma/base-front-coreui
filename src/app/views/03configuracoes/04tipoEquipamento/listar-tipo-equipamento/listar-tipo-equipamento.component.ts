import { Component, OnInit } from '@angular/core';
import {
  TableDirective,
  ColComponent,
  RowComponent,
  DropdownModule,
  CardModule,
  ButtonModule,
  ButtonGroupModule,
  ModalService
} from '@coreui/angular';
import { IconComponent } from '@coreui/icons-angular';
import { AddOrEditTipoEquipamentoComponent } from '../add-or-edit-tipo-equipamento/add-or-edit-tipo-equipamento.component';

import { TipoEquipamentoService } from '../../services/tipoequipamento.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Pagination } from '../../../shared/models/pagination';
import { Filter } from '../../../shared/models/Filters/Filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-listar-tipo-equipamento',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    ButtonModule,
    ButtonGroupModule,
    CardModule,
    ColComponent,
    RowComponent,
    IconComponent,
    DropdownModule,
    AddOrEditTipoEquipamentoComponent,
    SpinnerComponent,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-tipo-equipamento.component.html',
  styleUrl: './listar-tipo-equipamento.component.scss'
})
export class ListarTipoEquipamentoComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter();
  public subjectObj = new Subject<number>();

  public departamentos: any[] = [];
  public tipo_equipamentos: any[] = []
  public tipo_equipamento: any
  public loading: boolean = false

  constructor(
    private modalService: ModalService,
    private tipoEquipamentoService: TipoEquipamentoService
  ) { }

  ngOnInit(): void {
    this.listarTipoEquipamentos()
  }

  launchModal() {
    this.modalService.toggle({ show: true, id: 'modalAddOrTipoEquipamento' });
  }

  IsEmpty() {
    return this.pagination.total == 0;
  }

  public listarTipoEquipamentos() {

    this.loading = true
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", ((this.filter.search) || '').toString())
      .set("isPaginate", "1");

    this.tipoEquipamentoService.list(httpParams).subscribe(data => {
      this.tipo_equipamentos = data.data;
      this.pagination.page = data.current_page;
      this.pagination.perPage = data.per_page;
      this.pagination.lastPage = data.last_page;
      this.pagination.total = data.total;
      this.loading = false
    },
      error => {
        console.error('Erro ao buscar tipoEquipamento:', error);
      }
    );
  }

  setData(data: any) {
    this.tipo_equipamento = data
  }

  public getPageFilterData(page: number) {
    this.pagination.page = page;
    this.listarTipoEquipamentos()
  }
}
