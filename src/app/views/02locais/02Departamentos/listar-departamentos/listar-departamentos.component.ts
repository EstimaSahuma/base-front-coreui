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
import { AddOrEditDepartamentosComponent } from '../add-or-edit-departamentos/add-or-edit-departamentos.component';
import { DepartamentosService } from '../../services/departamentos.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Pagination } from '../../../shared/models/pagination';
import { Filter } from '../../../shared/models/Filters/Filter';
import { NgxPaginationModule } from 'ngx-pagination';
import {Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-listar-departamentos',
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
    AddOrEditDepartamentosComponent,
    SpinnerComponent,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-departamentos.component.html',
  styleUrls: ['./listar-departamentos.component.scss']
})
export class ListarDepartamentosComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter();
  public subjectObj = new Subject<number>();

  public departamentos: any[] = [];
  public departamento: any
  public loading: boolean = false

  constructor(
    private modalService: ModalService,
    private departamentosService: DepartamentosService
  ) { }

  ngOnInit(): void {
    this.listarDepartamentos()
  }

  launchModal() {
    this.modalService.toggle({ show: true, id: 'modalAddOrEditDepartment' });
  }

  IsEmpty(){
    return  this.pagination.total==0;
  }

  public listarDepartamentos() {

    this.loading = true
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", ((this.filter.search)||'').toString())
      .set("isPaginate", "1");

    this.departamentosService.list(httpParams).subscribe(data => {
      this.departamentos = data.data;
      this.pagination.page = data.current_page;
      this.pagination.perPage = data.per_page;
      this.pagination.lastPage = data.last_page;
      this.pagination.total = data.total;
      this.loading = false
    },
      error => {
        console.error('Erro ao buscar departamentos:', error);
      }
    );
  }

  setData(data: any) {
    this.departamento = data
  }

  public getPageFilterData(page: number) {
    this.pagination.page = page;
    this.listarDepartamentos()
  }
}
