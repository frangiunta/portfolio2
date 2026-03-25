import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token';

export const perfilInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Inyectamos el servicio de token de forma funcional
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  // Si tenemos un token, clonamos la petición y agregamos el Header
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  // Si no hay token, la petición sigue su curso original
  return next(req);
};