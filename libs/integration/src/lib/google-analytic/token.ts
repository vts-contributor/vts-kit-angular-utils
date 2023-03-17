import { InjectionToken } from '@angular/core';

export type VtsGoogleAnalyticsConfig = {
  id: string;
  uri?: string;
};

export const VTS_GOOGLE_ANALYTICS_CONFIG =
  new InjectionToken<VtsGoogleAnalyticsConfig>('Google Analytic configuration');
