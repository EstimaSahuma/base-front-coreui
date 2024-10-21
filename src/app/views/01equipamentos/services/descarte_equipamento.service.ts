import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BaseStorageService } from '../../../services/base-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DescarteEquipamentosService extends BaseStorageService {

  constructor(protected override http: ApiService) {
    super('equipamentos/descarte', http);
  }
}
