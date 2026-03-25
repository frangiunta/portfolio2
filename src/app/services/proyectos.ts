import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Proyectos } from '../interface/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  // Inyección funcional moderna
  private readonly http = inject(HttpClient);
  
  // URL base desde el archivo de entorno
  private readonly apiServerUrl = environment.apiBaseUrl;

  /**
   * Obtiene la lista de todos los proyectos
   */
  public GetProyecto(): Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/Proyecto/todos`);
  }

  /**
   * Agrega un nuevo proyecto al portfolio
   */
  public addProyecto(proyecto: Proyectos): Observable<Proyectos> {
    return this.http.post<Proyectos>(`${this.apiServerUrl}/Proyecto/agregar`, proyecto);
  }

  /**
   * Edita los datos de un proyecto existente
   */
  public updateProyecto(proyecto: Proyectos): Observable<Proyectos> {
    return this.http.put<Proyectos>(`${this.apiServerUrl}/Proyecto/editar`, proyecto);
  }

  /**
   * Elimina un proyecto mediante su ID
   */
  public deleteProyecto(proyectoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Proyecto/borrar/${proyectoId}`);
  }
}