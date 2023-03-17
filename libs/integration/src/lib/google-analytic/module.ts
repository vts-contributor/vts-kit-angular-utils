import { ModuleWithProviders, NgModule } from '@angular/core';
import { VTS_GOOGLE_ANALYTIC_INITIAL } from './initial';
import { VtsGoogleAnalyticsConfig, VTS_GOOGLE_ANALYTICS_CONFIG } from './token';

@NgModule({})
export class VtsGoogleAnalyticsModule {
  static forRoot(
    moduleConfig: VtsGoogleAnalyticsConfig
  ): ModuleWithProviders<VtsGoogleAnalyticsModule> {
    return {
      ngModule: VtsGoogleAnalyticsModule,
      providers: [
        {
          provide: VTS_GOOGLE_ANALYTICS_CONFIG,
          useValue: moduleConfig,
        },
        VTS_GOOGLE_ANALYTIC_INITIAL,
      ],
    };
  }
}
