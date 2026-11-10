import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { RECORD_CONFIG } from './shared/record-config';

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
  ],
};
