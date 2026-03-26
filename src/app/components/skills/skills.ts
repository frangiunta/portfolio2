import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// Servicios e Interfaces
import { SkillsService } from '../../services/skills';
import { Skills } from '../../interface/skills';
import { TokenService } from '../../services/token';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatProgressBarModule, 
    MatButtonModule, 
    MatCardModule
  ],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class SkillsComponent implements OnInit {
  // Inyección de servicios moderna
  private skillsService = inject(SkillsService);
  private tokenService = inject(TokenService);

  // Estado con Signals
  public skills = signal<Skills[]>([]);
  public isAdmin = signal<boolean>(true); // for development: always show action buttons

  // Variables auxiliares para modales
  public editSkill: Skills | null = null;
  public deleteSkill: Skills | null = null;

  ngOnInit(): void {
    this.getSkills();
    this.checkAdminStatus();
  }

  private checkAdminStatus(): void {
    const roles = this.tokenService.getAuthorities();
    this.isAdmin.set(roles.includes('ROLE_ADMIN'));
  }

  public getSkills(): void {
    this.skillsService.GetSkill().subscribe({
      next: (response: Skills[]) => {
        this.skills.set(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener skills:', error.message);
      }
    });
  }

  public onAddSkill(addForm: NgForm): void {
    // Cerramos el modal usando el ID del botón de cierre (ajustado para Bootstrap 5)
    document.getElementById('add-skill-close')?.click();
    
    this.skillsService.addSkill(addForm.value).subscribe({
      next: () => {
        this.getSkills();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateSkill(skill: Skills): void {
    this.skillsService.updateSkill(skill).subscribe({
      next: () => this.getSkills(),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public onDeleteSkill(skillId: number): void {
    this.skillsService.deleteSkill(skillId).subscribe({
      next: () => this.getSkills(),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  // Lógica de apertura de modales adaptada a Bootstrap 5 (data-bs-target)
  public onOpenModal(skill: Skills | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editSkill = skill;
      button.setAttribute('data-bs-target', '#updateSkill');
    } else if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addSkill');
    } else if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-bs-target', '#deleteSkill');
    }

    container?.appendChild(button);
    button.click();
    button.remove(); // Limpieza del DOM
  }
}