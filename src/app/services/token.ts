import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  // Inyectamos el ID de plataforma para detectar el entorno
  private readonly platformId = inject(PLATFORM_ID);

  public setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  public setUserName(userName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(USERNAME_KEY);
      window.sessionStorage.setItem(USERNAME_KEY, userName);
    }
  }

  public getUserName(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(USERNAME_KEY);
    }
    return null;
  }

  public setAuthorities(authorities: string[]): void {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(AUTHORITIES_KEY);
      window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }
  }

  public getAuthorities(): string[] {
    const roles: string[] = [];
    
    if (isPlatformBrowser(this.platformId)) {
      const storedAuthorities = sessionStorage.getItem(AUTHORITIES_KEY);
      if (storedAuthorities) {
        try {
          const parsed = JSON.parse(storedAuthorities);
          parsed.forEach((authority: any) => {
            roles.push(authority.authority || authority);
          });
        } catch (e) {
          console.error('Error parseando autoridades:', e);
        }
      }
    }
    return roles;
  }

  public logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.clear();
    }
  }
}