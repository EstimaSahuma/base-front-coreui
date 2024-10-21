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
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Pagination } from '../../../shared/models/pagination';
import { Filter } from '../../../shared/models/Filters/Filter';
import { NgxPaginationModule } from 'ngx-pagination';
import {Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddOrEditCategoriaComponent } from '../add-or-edit-categoria/add-or-edit-categoria.component';

@Component({
  selector: 'app-listar-categoria',
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
    AddOrEditCategoriaComponent,
    FormsModule
  ],
  templateUrl: './listar-categoria.component.html',
  styleUrl: './listar-categoria.component.scss'
})
export class ListarCategoriaComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter();
  public subjectObj = new Subject<number>();

  public categorias: any[] = [];
  public categoria: any
  public loading: boolean = false

  constructor(
    private modalService: ModalService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.listarCategorias()
  }

  launchModal() {
    this.modalService.toggle({ show: true, id: 'modalAddOrEditCategoria' });
  }

  IsEmpty(){
    return  this.pagination.total==0;
  }

  public listarCategorias() {

    this.loading = true
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", ((this.filter.search)||'').toString())
      .set("isPaginate", "1");

    this.categoriaService.list(httpParams).subscribe(data => {
      this.categorias = data.data;
      this.pagination.page = data.current_page;
      this.pagination.perPage = data.per_page;
      this.pagination.lastPage = data.last_page;
      this.pagination.total = data.total;
      this.loading = false
    },
      error => {
        console.error('Erro ao buscar categorias:', error);
      }
    );
  }

  setData(data: any) {
    this.categoria = data
  }

  public getPageFilterData(page: number) {
    this.pagination.page = page;
    this.listarCategorias()
  }
}
