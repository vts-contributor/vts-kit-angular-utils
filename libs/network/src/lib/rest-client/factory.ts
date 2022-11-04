import { HttpClient } from '@angular/common/http';
import { RestClient } from './facade';
import { VtsRestModuleConfig } from './module';

export const RestClientFactory = (
  http: HttpClient,
  moduleConfig?: VtsRestModuleConfig
) => {
  const { defaultConfig } = moduleConfig || {};
  return new RestClient(http, defaultConfig);
};
