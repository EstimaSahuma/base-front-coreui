import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { map, debounceTime, finalize } from 'rxjs/operators';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseStorageService {

  protected url: string;
  protected http: ApiService;
  public loading: boolean = false;

  constructor(url: string, http: ApiService) {
    this.url = url;
    this.http = http; 
  }

  public list(filters?: HttpParams, suburl: string = ""): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/${suburl}`, filters).pipe(
      debounceTime(500),
      finalize(() => this.loading = false),
      map((data) => data?.data) // Verifica se 'data' é definido
    );
  }


  /**
   * @author 'eldade113@gmail.com'
   * @description 'Permite visualizar'
   * @param id
   */
  show(id: number): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'eldade113@gmail.com'
   * @description 'Permite registar'
   * @param form
   * @returns
   */

  store(form: Object = {}, suburl = ""): Observable<any> {    
    this.loading = true;
    return this.http.post(`${this.url}/${suburl}`, form).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }
  /**
   * @author 'eldade113@gmail.com'
   * @description 'Permite actualizar'
   * @param form
   * @param params
   */
   update(form: Object = {}, id:number, suburl = ""): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.url}/${id}`, form).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }
  /**
   * @author 'eldade113@gmail.com'
   * @description 'Permite eliminar'
   * @param id
   */
  delete(id: number) {
    this.loading = true;
    return this.http.delete(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }
  /**
   * @author 'eldade113@gmail.com'
   * @description 'Permite actualizar'
   * @param form
   * @param params
   */
  storeOrUpdate(form: FormGroup, id = null): Observable<any> {
    return id == null ? this.store(form) : this.update(form, id);
  }
}
