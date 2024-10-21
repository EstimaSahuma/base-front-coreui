import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BaseStorageService } from '../../../services/base-storage.service';
import { HttpParams } from '@angular/common/http';
import { debounceTime, finalize, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CondicaoService extends BaseStorageService {


  constructor(protected override http: ApiService) {
    super('config/condicao', http);
  }

  public getCondicoes(): Observable<any> {
    this.loading = true;
    return this.http.get(`config/listcondicao`).pipe(
      debounceTime(500),
      finalize(() => this.loading = false),
      map((data) => data?.data) // Verifica se 'data' é definido
    );
  }

}
