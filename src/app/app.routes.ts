import { Routes } from '@angular/router';

// Importación de componentes
import { LoginComponent } from './components/auth/login/login';
import { RegistroComponent } from './components/auth/registro/registro/registro';
import { MainComponent } from './components/main/main';
import { EducacionComponent } from './components/educacion/educacion';
import { SkillsComponent } from './components/skills/skills';

export const routes: Routes = [
  // Página principal: Portfolio público
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'educacion', component: EducacionComponent },
  { path: 'skills', component: SkillsComponent },
  
  // Comodín para rutas no encontradas (404)
  { path: '**', redirectTo: 'main' }
];