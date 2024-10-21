import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BaseStorageService } from '../../../services/base-storage.service';
import { debounceTime, finalize, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocaisService extends BaseStorageService {

  constructor(protected override http: ApiService) {
    super('config/locais', http);
  }
  
  public getLocais(): Observable<any> {
    this.loading = true;
    return this.http.get(`config/list-locais`).pipe(
      debounceTime(500),
      finalize(() => this.loading = false),
      map((data) => data?.data) // Verifica se 'data' é definido
    );
  }
}
