// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { BaseStorageService } from 'src/app/services/base-storage.service';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseStorageService {

  public isAuthenticated = false;


  constructor(protected override http: ApiService, private router: Router) {
    super('config/locais', http);
  }

  // Método de login real
  login(data: any): Observable<any> {
    return this.http.post('auth/login', data).pipe(
      tap(response => {
        if (response.token) {
          this.isAuthenticated = true;
          localStorage.setItem('token', response.token); // Armazena o token
        }
      })
    );
  }

  // Verifica se o usuário está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método de logout real
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    return this.http.post('auth/logout').pipe(
      tap(() => {

      })
    );
  }

}
