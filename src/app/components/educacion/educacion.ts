import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Reemplaza funcionalidades de base
import { FormsModule, NgForm } from '@angular/forms'; // Necesario para NgForm
import { HttpErrorResponse } from '@angular/common/http';
import { Educacion } from '../../interfaces/Educacion';
import { EducacionService } from '../../servicios/educacion.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-educacion',
  standalone: true, // Indica que es un componente autónomo
  imports: [CommonModule, FormsModule], // Importamos lo que antes estaba en AppModule
  templateUrl: './educacion.html',
  styleUrls: ['./educacion.css']
})
export class EducacionComponent implements OnInit {
  // Inyección de servicios moderna
  private educacionService = inject(EducacionService);
  private tokenService = inject(TokenService);

  // Usamos Signals para el estado (más eficiente)
  public educaciones = signal<Educacion[]>([]);
  public editEducacion?: Educacion;
  public deleteEducacion?: Educacion;
  public educacion?: Educacion;

  isAdmin = signal<boolean>(false);

  ngOnInit(): void {
    this.getEducaciones();
    this.checkAdminStatus();
  }

  private checkAdminStatus(): void {
    const roles = this.tokenService.getAuthorities();
    this.isAdmin.set(roles.includes('ROLE_ADMIN'));
  }

  public getEducaciones(): void {
    this.educacionService.getEducacion().subscribe({
      next: (response) => {
        this.educaciones.set(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cargar educación', error.message);
      }
    });
  }

  public onAddEducacion(addForm: NgForm): void {
    // Cerramos el modal usando la API de Bootstrap (si la usas) o el click manual
    document.getElementById('add-educacion-form')?.click();

    this.educacionService.addEducacion(addForm.value).subscribe({
      next: () => {
        this.getEducaciones();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onUpdateEducacion(educacion: Educacion): void {
    this.educacionService.updateEducacion(educacion).subscribe({
      next: () => this.getEducaciones(),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public onDeleteEducacion(educacionId: number): void {
    this.educacionService.deleteEducacion(educacionId).subscribe({
      next: () => this.getEducaciones(),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  // Lógica de Modales (Se mantiene igual, pero con chequeos de nulidad)
  public onOpenModal(educacion: Educacion, mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal'); // Actualizado a Bootstrap 5 (data-bs)

    if (mode === 'edit') {
      this.editEducacion = educacion;
      button.setAttribute('data-bs-target', '#updateEducacion');
    }
    if (mode === 'add') {
      this.educacion = educacion;
      button.setAttribute('data-bs-target', '#addEducacion');
    }
    if (mode === 'delete') {
      this.deleteEducacion = educacion;
      button.setAttribute('data-bs-target', '#deleteEducacion');
    }

    container?.appendChild(button);
    button.click();
    button.remove(); // Limpiamos el DOM
  }
}
