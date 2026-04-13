import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importa los componentes que ya modernizamos
import { ToolbarComponent } from '../toolbar/toolbar';
import { PerfilComponent } from '../perfil/perfil';
import { ExperienciaComponent } from '../experiencia/experiencia';
import { EducacionComponent } from '../educacion/educacion';
import { FooterComponent } from '../footer/footer';
import { SkillsComponent } from "../skills/skills";
import { ProyectosComponent } from "../proyectos/proyectos";
import { BackgroundComponent } from '../background/background';
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
    FooterComponent,
    SkillsComponent,
    ProyectosComponent,
    BackgroundComponent
],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {
  // Eliminamos ngOnInit y el constructor si no tienen lógica,
  // siguiendo la filosofía de código limpio de Angular 21.
}