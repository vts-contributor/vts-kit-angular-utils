import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { RestClient } from './facade';
import { RestClientFactory } from './factory';
import { RestClientOptions } from './options';

export const VTS_REST_MODULE_CONFIG = new InjectionToken<VtsRestModuleConfig>(
  'VTS_REST_MODULE_CONFIG'
);

export interface VtsRestModuleConfig {
  defaultConfig?: RestClientOptions;
}

@NgModule({
  imports: [HttpClientModule],
})
export class VtsRestModule {
  static forRoot(
    moduleConfig?: VtsRestModuleConfig
  ): ModuleWithProviders<VtsRestModule> {
    return {
      ngModule: VtsRestModule,
      providers: [
        {
          provide: VTS_REST_MODULE_CONFIG,
          useValue: moduleConfig,
        },
        {
          provide: RestClient,
          useFactory: (http: HttpClient) =>
            RestClientFactory(http, moduleConfig),
          deps: [HttpClient],
        },
      ],
    };
  }
}
