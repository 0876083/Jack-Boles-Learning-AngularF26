import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RECORD_CONFIG } from './shared/record-config';
import { RecordService } from './services/record';
import { MockRecordService } from './services/mock-record';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: RECORD_CONFIG,
      useValue: {
        apiBaseUrl: 'https://placeholder.example.com/api',
        defaultGenre: 'Rock',
      },
    },

    //To use the real service again remove this provider.
    {
      provide: RecordService,
      useClass: MockRecordService,
    },
  ],
};
