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
import { EstadosService } from '../../services/estados.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Pagination } from '../../../shared/models/pagination';
import { Filter } from '../../../shared/models/Filters/Filter';
import { NgxPaginationModule } from 'ngx-pagination';
import {Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddOrEditEstadoComponent } from '../add-or-edit-estado/add-or-edit-estado.component';

@Component({
  selector: 'app-listar-estados',
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
    SpinnerComponent,
    NgxPaginationModule,
    AddOrEditEstadoComponent,
    FormsModule
  ],
  templateUrl: './listar-estados.component.html',
  styleUrl: './listar-estados.component.scss'
})
export class ListarEstadosComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter();
  public subjectObj = new Subject<number>();

  public estados: any[] = [];
  public estado: any
  public loading: boolean = false

  constructor(
    private modalService: ModalService,
    private estadosService: EstadosService
  ) { }

  ngOnInit(): void {
    this.listarEstados()
  }

  launchModal() {
    this.modalService.toggle({ show: true, id: 'modalAddOrEditEstado' });
  }

  IsEmpty(){
    return  this.pagination.total==0;
  }

  public listarEstados() {

    this.loading = true
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", ((this.filter.search)||'').toString())
      .set("isPaginate", "1");

    this.estadosService.list(httpParams).subscribe(data => {
      this.estados = data.data;
      this.pagination.page = data.current_page;
      this.pagination.perPage = data.per_page;
      this.pagination.lastPage = data.last_page;
      this.pagination.total = data.total;
      this.loading = false
    },
      error => {
        console.error('Erro ao buscar estados:', error);
      }
    );
  }

  setData(data: any) {
    this.estado = data
  }

  public getPageFilterData(page: number) {
    this.pagination.page = page;
    this.listarEstados()
  }
}
