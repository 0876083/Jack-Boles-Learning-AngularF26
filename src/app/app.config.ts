import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { RECORD_CONFIG } from './shared/record-config';
import { loadingInterceptor } from './interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: RECORD_CONFIG,
      useValue: {
        apiBaseUrl: 'https://itunes.apple.com',
        defaultGenre: 'Rock',
      },
    },
    provideHttpClient(
      withInterceptors([loadingInterceptor])
    ),
  ],
};
