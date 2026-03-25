import { Routes } from '@angular/router';

// Importación de componentes (Asegurate de que las rutas de archivo sigan siendo estas)
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MainComponent } from './main/main.component';

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
  { path: 'educacion', component: import('./components/educacion/educacion.component').then(c => c.EducacionComponent) },
  { path: 'skills', component: import('./components/skills/skills.component').then(c => c.SkillsComponent) },
  
  // Comodín para rutas no encontradas (404)
  { path: '**', redirectTo: 'login' }
];