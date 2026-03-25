import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../interfaces/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  // 1. Usamos inject() en lugar del constructor
  private readonly http = inject(HttpClient);
  
  // 2. Mantenemos la referencia a environment
  private readonly apiServerUrl = environment.apiBaseUrl;

  /**
   * Obtiene la lista completa de perfiles
   */
  public GetPerfil(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.apiServerUrl}/Perfil/todos`);
  }

  /**
   * Agrega un perfil nuevo
   */
  public addPerfil(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(`${this.apiServerUrl}/Perfil/agregar`, perfil);
  }

  /**
   * Edita un perfil existente
   */
  public updatePerfil(perfil: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(`${this.apiServerUrl}/Perfil/editar`, perfil);
  }

  /**
   * Borra un perfil por ID
   */
  public deletePerfil(perfilId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Perfil/borrar/${perfilId}`);
  }
}