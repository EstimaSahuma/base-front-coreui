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
import { CondicaoService } from '../../services/condicao.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Pagination } from '../../../shared/models/pagination';
import { Filter } from '../../../shared/models/Filters/Filter';
import { NgxPaginationModule } from 'ngx-pagination';
import {Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddOrEditCondicaoComponent } from '../add-or-edit-condicao/add-or-edit-condicao.component';

@Component({
  selector: 'app-listar-condicao',
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
    AddOrEditCondicaoComponent,
    FormsModule
  ],
  templateUrl: './listar-condicao.component.html',
  styleUrl: './listar-condicao.component.scss'
})
export class ListarCondicaoComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter();
  public subjectObj = new Subject<number>();

  public condicoes: any[] = [];
  public condicao: any
  public loading: boolean = false

  constructor(
    private modalService: ModalService,
    private condicaoService: CondicaoService
  ) { }

  ngOnInit(): void {
    this.listarCondicao()
  }

  launchModal() {
    this.modalService.toggle({ show: true, id: 'modalAddOrEditCondicao' });
  }

  IsEmpty(){
    return  this.pagination.total==0;
  }

  public listarCondicao() {

    this.loading = true
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", ((this.filter.search)||'').toString())
      .set("isPaginate", "1");

    this.condicaoService.list(httpParams).subscribe(data => {
      this.condicoes = data.data;
      this.pagination.page = data.current_page;
      this.pagination.perPage = data.per_page;
      this.pagination.lastPage = data.last_page;
      this.pagination.total = data.total;
      this.loading = false
    },
      error => {
        console.error('Erro ao buscar condições:', error);
      }
    );
  }

  setData(data: any) {
    this.condicao = data
  }

  public getPageFilterData(page: number) {
    this.pagination.page = page;
    this.listarCondicao()
  }
}
