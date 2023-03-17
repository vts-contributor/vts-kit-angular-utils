import { VtsGoogleAnalyticsConfig, VTS_GOOGLE_ANALYTICS_CONFIG } from './token';
import { APP_INITIALIZER, isDevMode, Provider } from '@angular/core';

function VtsGoogleAnalyticsInitializer(moduleConfig: VtsGoogleAnalyticsConfig) {
  return async () => {
    if (!document) {
      if (!isDevMode()) {
        console.error('Document not found.');
      }
    }

    const { id, uri } = moduleConfig;

    if (!id) {
      if (!isDevMode()) {
        console.error('Google Analytic ID is not provided.');
      }
    }
    const s: HTMLScriptElement = document.createElement('script');
    s.async = true;
    s.src = uri || `https://www.googletagmanager.com/gtag/js?id=${id}`;

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(s);
  };
}

export const VTS_GOOGLE_ANALYTIC_INITIAL: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: VtsGoogleAnalyticsInitializer,
  deps: [VTS_GOOGLE_ANALYTICS_CONFIG],
};
