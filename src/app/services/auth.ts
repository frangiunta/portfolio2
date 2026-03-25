import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces (Asegurate de que las rutas sean correctas)
import { NuevoUser } from '../interfaces/security/nuevo-user';
import { LoginUser } from '../interfaces/security/login-user';
import { JwtDTO } from '../interfaces/security/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inyección moderna de HttpClients
  private readonly http = inject(HttpClient);

  // URL del backend (Heroku/Render/etc)
  private readonly authURL = 'https://portfolio-franciscogiunta.herokuapp.com/auth/';

  /**
   * Registra un nuevo usuario
   */
  public nuevo(nuevoUsuario: NuevoUser): Observable<any> {
    return this.http.post<any>(`${this.authURL}nuevo`, nuevoUsuario);
  }

  /**
   * Realiza el login y obtiene el JWT
   */
  public login(loginUsuario: LoginUser): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(`${this.authURL}login`, loginUsuario);
  }
}