import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
// Material (Asegúrate de tener estos instalados/importados)
import { MatButtonModule } from '@angular/material/button'; 

import { Perfil } from '../../interface/perfil';
import { PerfilService } from '../../services/perfil';
import { TokenService } from '../../services/token';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {
  // Inyección moderna
  private perfilService = inject(PerfilService);
  private tokenService = inject(TokenService);

  // Estado con Signals
  public perfiles = signal<Perfil[]>([]);
  public isAdmin = signal<boolean>(false);
  
  public editPerfil?: Perfil;
  public perfil?: Perfil;

  ngOnInit(): void {
    this.getPerfiles();
    this.checkAdminStatus();
  }

  private checkAdminStatus(): void {
    const roles = this.tokenService.getAuthorities();
    // Más limpio que un forEach
    this.isAdmin.set(roles.some(role => role === 'ROLE_ADMIN'));
  }

  public getPerfiles(): void {
    this.perfilService.GetPerfil().subscribe({
      next: (response: Perfil[]) => {
        this.perfiles.set(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener perfiles', error.message);
      }
    });
  }

  public onUpdatePerfil(perfil: Perfil): void {
    this.perfilService.updatePerfil(perfil).subscribe({
      next: (response: Perfil) => {
        this.getPerfiles();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(perfil: Perfil, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    
    // Actualizado para Bootstrap 5
    button.setAttribute('data-bs-toggle', 'modal');
    
    if (mode === 'edit') {
      this.editPerfil = perfil;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    
    container?.appendChild(button);
    button.click();
    button.remove(); // Limpieza del DOM
  }

  onLogOut(): void {
    this.tokenService.logOut();
    // En Angular 21, podrías usar el Router en lugar de reload()
    window.location.reload();
  }
}