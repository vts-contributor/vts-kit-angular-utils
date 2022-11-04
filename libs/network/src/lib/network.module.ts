import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { RestClient } from './rest-client';
import { RestClientOptions } from './rest-client';

export const VTS_NETWORK_CONFIG = new InjectionToken<VtsNetworkModuleConfig>(
  'VTS_NETWORK_CONFIG'
);

export interface VtsNetworkModuleConfig {
  restConfig?: RestClientOptions;
}

@NgModule({
  imports: [HttpClientModule],
})
export class VtsNetworkModule {
  static forRoot(
    moduleConfig?: VtsNetworkModuleConfig
  ): ModuleWithProviders<VtsNetworkModule> {
    return {
      ngModule: VtsNetworkModule,
      providers: [
        {
          provide: VTS_NETWORK_CONFIG,
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

export const RestClientFactory = (
  http: HttpClient,
  moduleConfig?: VtsNetworkModuleConfig
) => {
  const { restConfig } = moduleConfig || {};
  return new RestClient(http, restConfig);
};
