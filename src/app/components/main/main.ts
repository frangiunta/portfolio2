import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App } from '../../app';
import { BackgroundComponent } from '../background/background';
import { ToolbarComponent } from '../toolbar/toolbar';
import { PerfilComponent } from '../perfil/perfil';
import { ExperienciaComponent } from '../experiencia/experiencia';
import { EducacionComponent } from '../educacion/educacion';
import { FooterComponent } from '../footer/footer';
import { SkillsComponent } from "../skills/skills";
import { ProyectosComponent } from "../proyectos/proyectos";
<<<<<<< HEAD
import { BackgroundComponent } from '../background/background';
// Nota: Importa Skills y Proyectos cuando los tengamos listos
=======
>>>>>>> 411c734b2d5642f3411def0c59478240fd07650f

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
<<<<<<< HEAD
    BackgroundComponent
=======
    BackgroundComponent,
    App
>>>>>>> 9ebe28a2323de2937c784b0598b447a6002e03aa
],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {
}