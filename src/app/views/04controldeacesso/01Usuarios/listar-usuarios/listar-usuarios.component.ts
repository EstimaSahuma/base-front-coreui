
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
//import { AddOrEditLocaisComponent } from '../add-or-edit-locais/add-or-edit-locais.component';

import { UserService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Pagination } from '../../../shared/models/pagination';
import { Filter } from '../../../shared/models/Filters/Filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-listar-usuarios',
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
  //  AddOrEditLocaisComponent,
    SpinnerComponent,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss'
})
export class ListarUsuariosComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter();
  public subjectObj = new Subject<number>();

  public usuarios: any[] = []
  public usuario: any
  public loading: boolean = false

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios()
  }

  launchModal() {
    this.modalService.toggle({ show: true, id: 'modalAddOrEditLocal' });
  }

  IsEmpty() {
    return this.pagination.total == 0;
  }

  public listarUsuarios() {

    this.loading = true
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", ((this.filter.search) || '').toString())
      .set("isPaginate", "1");

    this.userService.list(httpParams).subscribe(data => {
      this.usuarios = data.data;
      this.pagination.page = data.current_page;
      this.pagination.perPage = data.per_page;
      this.pagination.lastPage = data.last_page;
      this.pagination.total = data.total;
      this.loading = false
    },
      error => {
        console.error('Erro ao buscar locais:', error);
      }
    );
  }

  setData(data: any) {
    this.usuario = data
  }

  public getPageFilterData(page: number) {
    this.pagination.page = page;
    this.listarUsuarios()
  }
}
