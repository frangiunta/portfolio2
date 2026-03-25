import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

// Importamos el interceptor funcional que creamos antes
import { perfilInterceptor } from './interceptor/perfil.interceptor';

// Para módulos de Material que aún no son 100% funcionales en providers
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Configuración de Rutas
    provideRouter(routes),
    
    // 2. Configuración de HTTP con Interceptor Funcional
    provideHttpClient(
      withInterceptors([perfilInterceptor])
    ),
    
    // 3. Animaciones de Browser (Reemplaza BrowserAnimationsModule)
    provideAnimations(),
    
    // 4. Módulos de Material (se cargan de forma global aquí si se desea)
    importProvidersFrom(
      MatProgressBarModule,
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatGridListModule
    )
  ]
};
