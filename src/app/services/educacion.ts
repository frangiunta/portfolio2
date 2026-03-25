import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Educacion } from '../interface/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  // 1. Usamos inject() en lugar del constructor (más limpio)
  private readonly http = inject(HttpClient);
  
  // 2. Cargamos la URL desde el environment
  private readonly apiServerUrl = environment.apiBaseUrl;

  // 3. Métodos con sintaxis moderna (camelCase recomendado para métodos)
  getEducacion(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/Educacion/todos`);
  }

  addEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${this.apiServerUrl}/Educacion/agregar`, educacion);
  }

  updateEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(`${this.apiServerUrl}/Educacion/editar`, educacion);
  }

  deleteEducacion(educacionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Educacion/borrar/${educacionId}`);
  }
}