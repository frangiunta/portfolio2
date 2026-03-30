import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { Experiencia } from '../../interface/experiencia';
import { ExperienciaService } from '../../services/experiencia';
import { TokenService } from '../../services/token';

@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatGridListModule],
  templateUrl: './experiencia.html',
  styleUrls: ['./experiencia.css']
})
export class ExperienciaComponent implements OnInit {
  // Inyección moderna
  private experienciaService = inject(ExperienciaService);
  private tokenService = inject(TokenService);

  // Estado con Signals
  public experiencias = signal<Experiencia[]>([]);
  public isAdmin = signal<boolean>(false);
  
  public editExperiencia: Experiencia | null = null;
  public deleteExperiencia: Experiencia | null = null;
  public experiencia: Experiencia | null = null;

  ngOnInit(): void {
    this.getExperiencias();
    this.checkAdminStatus();
  }

  private checkAdminStatus(): void {
    const roles = this.tokenService.getAuthorities();
    this.isAdmin.set(roles.includes('ROLE_ADMIN'));
  }

  public getExperiencias(): void {
    this.experienciaService.getExperiencia().subscribe({
      next: (response: Experiencia[]) => {
        this.experiencias.set(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener experiencias', error.message);
      }
    });
  }

  public onAddExperiencia(addForm: NgForm): void {
    console.log('Intentando agregar experiencia:', addForm.value);
    console.log('Token actual:', this.tokenService.getToken());
    
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response) => {
        console.log('Experiencia agregada exitosamente:', response);
        this.getExperiencias();
        addForm.reset();
        // Cerrar modal correctamente
        const modal = document.getElementById('addExperiencia');
        if (modal) {
          const bsModal = new (window as any).bootstrap.Modal(modal);
          bsModal.hide();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Error al agregar experiencia:');
        console.error('Status:', error.status);
        console.error('Mensaje:', error.message);
        console.error('URL:', error.url);
        console.error('Body:', error.error);
        addForm.reset();
      }
    });
  }

  public onUpdateExperiencia(experiencia: Experiencia): void {
    this.experienciaService.updateExperiencia(experiencia).subscribe({
      next: () => this.getExperiencias(),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }

  public onDeleteExperiencia(experienciaId: number): void {
    this.experienciaService.deleteExperiencia(experienciaId).subscribe({
      next: () => this.getExperiencias(),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }

  public onOpenModal(experiencia: Experiencia | null, mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';

    // Compatibilidad Bootstrap 5
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#updateExperiencia');
    } else if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addExperiencia');
    } else if (mode === 'delete') {
      this.deleteExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#deleteExperiencia');
    }

    container?.appendChild(button);
    button.click();
    button.remove();
  }
}
