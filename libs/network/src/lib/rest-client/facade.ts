import { HttpClient } from '@angular/common/http';
import { Observable, retry, timeout } from 'rxjs';
import { RestClientOptions } from './options';

export class RestClient {
  protected _config!: RestClientOptions;
  protected _defaultConfig?: RestClientOptions;
  protected _client: RestClient = this;

  constructor(
    public http: HttpClient,
    private defaultconfig?: RestClientOptions
  ) {
    this._defaultConfig = defaultconfig;
    this.setFromDefaultConfig();
  }

  public setHeader(key: string, value: string) {
    this._config = this._config.setHeader(key, value);
    return this;
  }

  public setHeaders(headers: { [key: string]: string }) {
    this._config = this._config.setHeaders(headers);
    return this;
  }

  public removeHeader(key: string) {
    this._config = this._config.removeHeader(key);
    return this;
  }

  public setParam(key: string, value: string) {
    this._config = this._config.setParam(key, value);
    return this;
  }

  public setParams(params: { [key: string]: string }) {
    this._config = this._config.setParams(params);
    return this;
  }

  public removeParam(key: string) {
    this._config = this._config.removeParam(key);
    return this;
  }

  public setWithCredentials(enable: boolean) {
    this._config = this._config.setWithCredentials(enable);
    return this;
  }

  public setReportProgress(enable: boolean) {
    this._config = this._config.setReportProgress(enable);
    return this;
  }

  public setRetry(retry: number) {
    this._config = this._config.setRetry(retry);
    return this;
  }

  public setTimeout(timeout: number) {
    this._config = this._config.setTimeout(timeout);
    return this;
  }

  public setBaseUrl(url: string) {
    this._config = this._config.setBaseUrl(url);
    return this;
  }

  public getConfig = () => this._config;

  public obserseBody = () =>
    new RestClientObserveBody(this._client, this._config);

  public obserseResponse = () =>
    new RestClientObserveResponse(this._client, this._config);

  public obserseEvents = () =>
    new RestClientObserveEvents(this._client, this._config);

  protected setFromDefaultConfig() {
    if (this._defaultConfig) {
      this._config = RestClientOptions.from(this._defaultConfig);
    } else {
      this._config = new RestClientOptions();
    }
  }

  protected enhance<T>(observable: Observable<T>) {
    const enhance$ = observable.pipe(
      timeout(this._config.getTimeout()),
      retry(this._config.getRetry())
    );
    this.setFromDefaultConfig();
    return enhance$;
  }

  protected resolveUrl(pathOrUrl: string) {
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://'))
      return pathOrUrl;
    const baseUrl = this._config.getBaseUrl() || '';
    const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${baseUrl}${path}`;
  }
}

export class RestClientObserveBody extends RestClient {
  constructor(client: RestClient, config: RestClientOptions) {
    super(client.http);
    this._config = config;
    this._client = client;
  }

  public get<T>(pathOrUrl: string): Observable<T>;
  public get(pathOrUrl: string): Observable<Object> {
    return super.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'body',
      })
    );
  }

  public getText(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'body',
      })
    );
  }

  public getBlob(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'body',
      })
    );
  }

  public getArrayBuffer(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'body',
      })
    );
  }
}

export class RestClientObserveResponse extends RestClient {
  constructor(client: RestClient, config: RestClientOptions) {
    super(client.http);
    this._config = config;
    this._client = client;
  }

  public get<T>(pathOrUrl: string): Observable<T>;
  public get(pathOrUrl: string): Observable<Object> {
    return this.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'response',
      })
    );
  }

  public getText(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'response',
      })
    );
  }

  public getBlob(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'response',
      })
    );
  }

  public getArrayBuffer(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'response',
      })
    );
  }
}

export class RestClientObserveEvents extends RestClient {
  constructor(client: RestClient, config: RestClientOptions) {
    super(client.http);
    this._config = config;
    this._client = client;
  }

  public get<T>(pathOrUrl: string): Observable<T>;
  public get(pathOrUrl: string): Observable<Object> {
    return this.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'events',
      })
    );
  }

  public getText(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'events',
      })
    );
  }

  public getBlob(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'events',
      })
    );
  }

  public getArrayBuffer(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.get(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'events',
      })
    );
  }
}
