import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Experiencia } from '../interface/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  // 1. Usamos inject() en lugar del constructor (más limpio)
  private readonly http = inject(HttpClient);
  
  // 2. Cargamos la URL desde el environment
  private readonly apiServerUrl = environment.apiBaseUrl;

  // 3. Métodos con sintaxis moderna (camelCase recomendado para métodos)
  getExperiencia(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/Experiencia/todos`);
  }

  addExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(`${this.apiServerUrl}/Experiencia/agregar`, experiencia);
  }

  updateExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(`${this.apiServerUrl}/Experiencia/editar`, experiencia);
  }

  deleteExperiencia(experienciaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Experiencia/borrar/${experienciaId}`);
  }
}
