import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importa los componentes que ya modernizamos
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { ExperienciaComponent } from '../experiencia/experiencia.component';
import { EducacionComponent } from '../educacion/educacion.component';
import { FooterComponent } from '../footer/footer.component';
// Nota: Importa Skills y Proyectos cuando los tengamos listos

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    PerfilComponent,
    ExperienciaComponent,
    EducacionComponent,
    FooterComponent
  ],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {
  // Eliminamos ngOnInit y el constructor si no tienen lógica,
  // siguiendo la filosofía de código limpio de Angular 21.
}