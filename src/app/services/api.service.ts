import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  constructor(private http: HttpClient/*, private jwtService: JwtHelperService*/) {}

/**
 *
 * @param authorization
 * @returns
 */
private setHeaders(authorization: boolean = true): HttpHeaders {
  const token = localStorage.getItem('token');

  const headersConfig: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Se o token existir e a autorização for requerida
  if (token && authorization) {
    headersConfig['Authorization'] = `Bearer ${token}`;
  }

  return new HttpHeaders(headersConfig);
}

  public formatErrors(error: any) {
    return throwError(JSON.stringify(error));
  }

  /**
   *
   * @param path
   * @param httpParams
   * @returns
   */
  public get(
    path: string,
    httpParams: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get<any>(`${env.app_url}${path}`, {
        headers: this.setHeaders(),
        params: httpParams,
      })
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param path
   * @param body
   * @param authorization
   * @returns
   */
  public post(
    path: string,
    body: Object = {},
    authorization = true
  ): Observable<any> {
    return this.http
      .post<any>(`${env.app_url}${path}`, body, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param path
   * @param body
   * @returns
   */
  public put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put<any>(`${env.app_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }
  /**
   *
   * @param path
   * @param body
   * @returns
   */
  public patch(path: string, body: Object = {}): Observable<any> {
    return this.http
      .patch<any>(`${env.app_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param path
   * @param httpParams
   * @returns
   */
  public delete(
    path: string,
    httpParams: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .delete<any>(`${env.app_url}${path}`, {
        headers: this.setHeaders(),
        params: httpParams,
      })
      .pipe(catchError(this.formatErrors));
  }

 

}
