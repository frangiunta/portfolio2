import { Injectable } from '@angular/core';

// Definimos las constantes fuera para mayor limpieza
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  /**
   * Guarda el token JWT. 
   * Usamos el operador opcional para asegurar limpieza.
   */
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  /**
   * Retorna los roles del usuario. 
   * Corregido para manejar correctamente el formato de Spring Security.
   */
  public getAuthorities(): string[] {
    const roles: string[] = [];
    const storedAuthorities = sessionStorage.getItem(AUTHORITIES_KEY);

    if (storedAuthorities) {
      try {
        const parsed = JSON.parse(storedAuthorities);
        parsed.forEach((authority: any) => {
          // Maneja tanto string directo como objeto { authority: 'ROLE_...' }
          roles.push(authority.authority || authority);
        });
      } catch (e) {
        console.error('Error parseando autoridades:', e);
      }
    }
    return roles;
  }

  /**
   * Limpia toda la sesión al cerrar sesión.
   */
  public logOut(): void {
    window.sessionStorage.clear();
  }
}