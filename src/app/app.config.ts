import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

// Importamos el interceptor funcional
import { perfilInterceptor } from './interceptor/perfil.interceptor';

// Módulos de Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

// ¡IMPORTANTE!: Asegúrate de que diga "export const"
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([perfilInterceptor])
    ),
    provideAnimationsAsync(), 
    importProvidersFrom(
      MatProgressBarModule,
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatGridListModule
    )
  ]
};

export default appConfig;