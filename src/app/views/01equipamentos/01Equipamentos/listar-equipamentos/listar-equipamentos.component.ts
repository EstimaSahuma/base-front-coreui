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
import { AddOrEditEquipamentoComponent } from '../add-or-edit-equipamento/add-or-edit-equipamento.component';
import { DescartarEquipamentoComponent } from '../descartar-equipamento/descartar-equipamento.component';
import { ManutencaoEquipamentoComponent } from '../manutencao-equipamento/manutencao-equipamento.component';



import { EquipamentosService } from '../../services/equipamentos.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Pagination } from '../../../shared/models/pagination';
import { Filter } from '../../../shared/models/Filters/Filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-listar-equipamentos',
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
    AddOrEditEquipamentoComponent,
    DescartarEquipamentoComponent,
    ManutencaoEquipamentoComponent,
    SpinnerComponent,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-equipamentos.component.html',
  styleUrl: './listar-equipamentos.component.scss'
})
export class ListarEquipamentosComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter();
  public subjectObj = new Subject<number>();

  public departamentos: any[] = [];
  public equipamentos: any[] = []
  public equipamento: any
  public loading: boolean = false

  constructor(
    private modalService: ModalService,
    private equipamentosService: EquipamentosService
  ) { }

  ngOnInit(): void {
    this.listarEquipamentos()
  }

  launchModal() {
    this.modalService.toggle({ show: true, id: 'modalAddOrEditEquipamento' });
  }

  launchModalDescarte() {
    this.modalService.toggle({ show: true, id: 'modalDescartarEquipamento' });
  }
    launchModalManutencao() {
    this.modalService.toggle({ show: true, id: 'modalManutencaoEquipamento' });
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

    this.equipamentosService.list(httpParams).subscribe(data => {
      this.equipamentos = data.data;
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