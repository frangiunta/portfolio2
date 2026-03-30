import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from '../toolbar/toolbar';
import { PerfilComponent } from '../perfil/perfil';
import { ExperienciaComponent } from '../experiencia/experiencia';
import { EducacionComponent } from '../educacion/educacion';
import { FooterComponent } from '../footer/footer';
import { SkillsComponent } from "../skills/skills";
import { ProyectosComponent } from "../proyectos/proyectos";

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
    ProyectosComponent
],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {
}