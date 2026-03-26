import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Interfaces (Asegurate de que las rutas sean correctas)
import { NewUser } from '../interface/security/newuser';
import { Login } from '../interface/security/login';
import { JwtDTO } from '../interface/security/jwtdto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inyección moderna de HttpClient
  private readonly http = inject(HttpClient);

  // URL del backend (Heroku/Render/etc)
  private readonly authURL = 'https://portfolio-franciscogiunta.herokuapp.com/auth/';

  // Credenciales de prueba
  private readonly ADMIN_USER = 'Admin';
  private readonly ADMIN_PASSWORD = 'Admin';

  /**
   * Registra un nuevo usuario
   */
  public nuevo(nuevoUsuario: NewUser): Observable<any> {
    return this.http.post<any>(`${this.authURL}nuevo`, nuevoUsuario);
  }

  /**
   * Realiza el login y obtiene el JWT
   * En modo desarrollo, valida contra credenciales locales
   */
  public login(loginUsuario: Login): Observable<JwtDTO> {
    // Validar contra credenciales locales
    if (loginUsuario.nombreUsuario === this.ADMIN_USER && 
        loginUsuario.password === this.ADMIN_PASSWORD) {
      
      // Generar un token simulado
      const token = this.generateMockToken();
      
      // Simular respuesta del servidor con pequeño delay
      const response: JwtDTO = {
        token: token,
        type: 'Bearer',
        nombreUsuario: this.ADMIN_USER,
        authorities: ['ROLE_ADMIN']
      };
      
      return of(response).pipe(delay(500)); // Simular latencia de red
    }
    
    // Si las credenciales son incorrectas, retornar error
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

  /**
   * Genera un token JWT simulado
   */
  private generateMockToken(): string {
    // Crear un token simple pero con estructura similar a JWT
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: this.ADMIN_USER,
      name: this.ADMIN_USER,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // Válido 24 horas
      authorities: ['ROLE_ADMIN']
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }
}