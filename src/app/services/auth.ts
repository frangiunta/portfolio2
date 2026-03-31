import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NewUser } from '../interface/security/newuser';
import { Login } from '../interface/security/login';
import { JwtDTO } from '../interface/security/jwtdto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly authURL = 'https://portfolio-franciscogiunta.herokuapp.com/auth/';

  private readonly ADMIN_USER = 'franciscogiunta';
  private readonly ADMIN_PASSWORD = 'portfolioapp';

  public nuevo(nuevoUsuario: NewUser): Observable<any> {
    return this.http.post<any>(`${this.authURL}nuevo`, nuevoUsuario);
  }

  public login(loginUsuario: Login): Observable<JwtDTO> {
    if (loginUsuario.nombreUsuario === this.ADMIN_USER && 
        loginUsuario.password === this.ADMIN_PASSWORD) {
      
      const token = this.generateMockToken();
      
      const response: JwtDTO = {
        token: token,
        type: 'Bearer',
        nombreUsuario: this.ADMIN_USER,
        authorities: ['ROLE_ADMIN']
      };
      
      return of(response).pipe(delay(500)); 
    }
    
    return new Observable((observer) => {
      setTimeout(() => {
        observer.error({
          error: {
            message: 'Usuario o contraseña incorrectos'
          }
        });
      }, 500);
    });
  }

  private generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: this.ADMIN_USER,
      name: this.ADMIN_USER,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), 
      authorities: ['ROLE_ADMIN']
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }
}