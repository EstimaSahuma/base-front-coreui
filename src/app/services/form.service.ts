import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, finalize } from 'rxjs/operators';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private route: string = `config`;
  constructor(private http: ApiService) { }

  /**
   * @author 'eldade113@gmail.com'
   * @description 'Pegar Departamentos para os select'
   * @return Observable
   */
  public getDepartamentos() {
    return this.http
      .get(`${this.route}/departamentos`)
      .pipe(map((data) => Object(data).data));
  }
}
