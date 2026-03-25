import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces (Asegurate de que las rutas sean correctas)
import { NewUser } from '../interface/security/newuser';
import { Login } from '../interface/security/login';
import { JwtDTO } from '../interface/security/jwtdto';

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
  public nuevo(nuevoUsuario: NewUser): Observable<any> {
    return this.http.post<any>(`${this.authURL}nuevo`, nuevoUsuario);
  }

  /**
   * Realiza el login y obtiene el JWT
   */
  public login(loginUsuario: Login): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(`${this.authURL}login`, loginUsuario);
  }
}