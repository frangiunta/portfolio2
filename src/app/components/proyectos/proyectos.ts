import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
// Angular Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
// Servicios e Interfaces
import { Proyectos } from '../../interface/proyectos';
import { ProyectosService } from '../../services/proyectos';
import { TokenService } from '../../services/token';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent implements OnInit {
  // Inyección moderna
  private proyectosService = inject(ProyectosService);
  private tokenService = inject(TokenService);

  // Estado con Signals
  public proyectos = signal<Proyectos[]>([]);
  public isAdmin = signal<boolean>(false);

  // Referencias para modales
  public editProyecto: Proyectos | null = null;
  public deleteProyecto: Proyectos | null = null;

  ngOnInit(): void {
    this.getProyectos();
    this.checkAdminStatus();
  }

  private checkAdminStatus(): void {
    const roles = this.tokenService.getAuthorities();
    this.isAdmin.set(roles.includes('ROLE_ADMIN'));
  }

  public getProyectos(): void {
    this.proyectosService.GetProyecto().subscribe({
      next: (response: Proyectos[]) => {
        this.proyectos.set(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cargar proyectos:', error.status);
      }
    });
  }

  public onAddProyecto(addForm: NgForm): void {
    // Bootstrap 5: Cerrar modal manualmente si es necesario
    document.getElementById('add-proyecto-close')?.click();

    this.proyectosService.addProyecto(addForm.value).subscribe({
      next: () => {
        this.getProyectos();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public onUpdateProyecto(proyecto: Proyectos): void {
    this.proyectosService.updateProyecto(proyecto).subscribe({
      next: () => this.getProyectos(),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public onDeleteProyecto(proyectoId: number): void {
    this.proyectosService.deleteProyecto(proyectoId).subscribe({
      next: () => this.getProyectos(),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public onOpenModal(proyecto: Proyectos | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editProyecto = proyecto;
      button.setAttribute('data-bs-target', '#updateProyecto');
    } else if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addProyecto');
    } else if (mode === 'delete') {
      this.deleteProyecto = proyecto;
      button.setAttribute('data-bs-target', '#deleteProyecto');
    }

    container?.appendChild(button);
    button.click();
    button.remove();
  }
}
