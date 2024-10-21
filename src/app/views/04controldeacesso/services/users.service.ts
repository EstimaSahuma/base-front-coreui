import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BaseStorageService } from '../../../services/base-storage.service';
import { debounceTime, finalize, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseStorageService {

  constructor(protected override http: ApiService) {
    super('auth/users', http);
  }
  }
