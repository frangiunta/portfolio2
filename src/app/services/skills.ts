import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skills } from 'src/app/interfaces/Skills';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  // 1. Inyección funcional de HttpClient
  private readonly http = inject(HttpClient);
  
  // 2. Referencia inmutable a la URL base
  private readonly apiServerUrl = environment.apiBaseUrl;

  /**
   * Obtiene la lista de todas las habilidades (Hard & Soft)
   */
  public GetSkill(): Observable<Skills[]> {
    return this.http.get<Skills[]>(`${this.apiServerUrl}/Skills/todos`);
  }

  /**
   * Registra una nueva habilidad
   */
  public addSkill(skill: Skills): Observable<Skills> {
    return this.http.post<Skills>(`${this.apiServerUrl}/Skills/agregar`, skill);
  }

  /**
   * Actualiza el porcentaje o nombre de una habilidad existente
   */
  public updateSkill(skill: Skills): Observable<Skills> {
    return this.http.put<Skills>(`${this.apiServerUrl}/Skills/editar`, skill);
  }

  /**
   * Elimina una habilidad por su ID
   */
  public deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Skills/borrar/${skillId}`);
  }
}