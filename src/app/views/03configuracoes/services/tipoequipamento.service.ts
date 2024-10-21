import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BaseStorageService } from '../../../services/base-storage.service';
import { HttpParams } from '@angular/common/http';
import { debounceTime, finalize, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoEquipamentoService extends BaseStorageService {

  constructor(protected override http: ApiService) {
    super('config/tipo-equipamento', http);
  }

  public getTipoEquipamento(): Observable<any> {
    this.loading = true;
    return this.http.get(`config/list-tipo-equipamento`).pipe(
      debounceTime(500),
      finalize(() => this.loading = false),
      map((data) => data?.data) // Verifica se 'data' é definido
    );
  }

}
