import { Routes } from '@angular/router';

// Importación de componentes (Asegurate de que las rutas de archivo sigan siendo estas)
import { LoginComponent } from './components/auth/login/login';
import { RegistroComponent } from './components/auth/registro/registro/registro';
import { MainComponent } from './components/main/main';
import { EducacionComponent } from './components/educacion/educacion';
import { SkillsComponent } from './components/skills/skills';

export const routes: Routes = [
  // Redirección inicial: Si entra a la raíz, va al Login o al Main según prefieras
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  
  // Tu componente principal que contiene las secciones
  { path: 'main', component: MainComponent },

  /**
   * NOTA: Si Educacion, Skills, etc., son SECCIONES dentro de Main, 
   * no necesitan ruta propia a menos que quieras navegar a una página aparte.
   * Si son páginas independientes, dejalas así:
   */
  { path: 'educacion', component: EducacionComponent },
  { path: 'skills', component: SkillsComponent },
  
  // Comodín para rutas no encontradas (404)
  { path: '**', redirectTo: 'login' }
];