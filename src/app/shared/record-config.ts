import { InjectionToken } from '@angular/core';

export interface RecordConfig {
  apiBaseUrl: string;
  defaultGenre: string;
}

export const RECORD_CONFIG = new InjectionToken<RecordConfig>('record.config');
