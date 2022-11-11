import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
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
    if (
      pathOrUrl.startsWith('http://') ||
      pathOrUrl.startsWith('https://') ||
      pathOrUrl.startsWith('./') ||
      pathOrUrl.startsWith('../')
    )
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

  public get(pathOrUrl: string): Observable<Object>;
  public get<T>(pathOrUrl: string): Observable<T>;
  public get<T>(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.get<T>(this.resolveUrl(pathOrUrl), {
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

  public delete(pathOrUrl: string): Observable<Object>;
  public delete<T>(pathOrUrl: string): Observable<T>;
  public delete<T>(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.delete<T>(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'body',
      })
    );
  }

  public deleteText(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'body',
      })
    );
  }

  public deleteBlob(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'body',
      })
    );
  }

  public deleteArrayBuffer(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'body',
      })
    );
  }

  public options(pathOrUrl: string): Observable<Object>;
  public options<T>(pathOrUrl: string): Observable<T>;
  public options<T>(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.options<T>(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'body',
      })
    );
  }

  public optionsText(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'body',
      })
    );
  }

  public optionsBlob(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'body',
      })
    );
  }

  public optionsArrayBuffer(pathOrUrl: string) {
    return super.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'body',
      })
    );
  }

  public put(pathOrUrl: string, body: any | null): Observable<Object>;
  public put<T>(pathOrUrl: string, body: any | null): Observable<T>;
  public put<T>(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.put<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'body',
      })
    );
  }

  public putText(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'body',
      })
    );
  }

  public putBlob(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'body',
      })
    );
  }

  public putArrayBuffer(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'body',
      })
    );
  }

  public post(pathOrUrl: string, body: any | null): Observable<Object>;
  public post<T>(pathOrUrl: string, body: any | null): Observable<T>;
  public post<T>(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.post<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'body',
      })
    );
  }

  public postText(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'body',
      })
    );
  }

  public postBlob(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'body',
      })
    );
  }

  public postArrayBuffer(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'body',
      })
    );
  }

  public patch(pathOrUrl: string, body: any | null): Observable<Object>;
  public patch<T>(pathOrUrl: string, body: any | null): Observable<T>;
  public patch<T>(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.patch<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'body',
      })
    );
  }

  public patchText(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'body',
      })
    );
  }

  public patchBlob(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'body',
      })
    );
  }

  public patchArrayBuffer(pathOrUrl: string, body: any | null) {
    return super.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
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

  public get(pathOrUrl: string): Observable<HttpResponse<Object>>;
  public get<T>(pathOrUrl: string): Observable<HttpResponse<T>>;
  public get<T>(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.get<T>(this.resolveUrl(pathOrUrl), {
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

  public delete(pathOrUrl: string): Observable<HttpResponse<Object>>;
  public delete<T>(pathOrUrl: string): Observable<HttpResponse<T>>;
  public delete<T>(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.delete<T>(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'response',
      })
    );
  }

  public deleteText(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'response',
      })
    );
  }

  public deleteBlob(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'response',
      })
    );
  }

  public deleteArrayBuffer(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'response',
      })
    );
  }

  public options(pathOrUrl: string): Observable<HttpResponse<Object>>;
  public options<T>(pathOrUrl: string): Observable<HttpResponse<T>>;
  public options<T>(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.options<T>(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'response',
      })
    );
  }

  public optionsText(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'response',
      })
    );
  }

  public optionsBlob(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'response',
      })
    );
  }

  public optionsArrayBuffer(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'response',
      })
    );
  }

  public put(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpResponse<Object>>;
  public put<T>(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpResponse<T>>;
  public put<T>(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.put<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'response',
      })
    );
  }

  public putText(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'response',
      })
    );
  }

  public putBlob(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'response',
      })
    );
  }

  public putArrayBuffer(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'response',
      })
    );
  }

  public post(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpResponse<Object>>;
  public post<T>(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpResponse<T>>;
  public post<T>(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.post<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'response',
      })
    );
  }

  public postText(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'response',
      })
    );
  }

  public postBlob(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'response',
      })
    );
  }

  public postArrayBuffer(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'response',
      })
    );
  }

  public patch(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpResponse<Object>>;
  public patch<T>(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpResponse<T>>;
  public patch<T>(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.patch<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'response',
      })
    );
  }

  public patchText(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'response',
      })
    );
  }

  public patchBlob(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'response',
      })
    );
  }

  public patchArrayBuffer(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
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

  public get(pathOrUrl: string): Observable<HttpEvent<Object>>;
  public get<T>(pathOrUrl: string): Observable<HttpEvent<T>>;
  public get<T>(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.get<T>(this.resolveUrl(pathOrUrl), {
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

  public delete(pathOrUrl: string): Observable<HttpEvent<Object>>;
  public delete<T>(pathOrUrl: string): Observable<HttpEvent<T>>;
  public delete<T>(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.delete<T>(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'events',
      })
    );
  }

  public deleteText(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'events',
      })
    );
  }

  public deleteBlob(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'events',
      })
    );
  }

  public deleteArrayBuffer(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.delete(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'events',
      })
    );
  }

  public options(pathOrUrl: string): Observable<HttpEvent<Object>>;
  public options<T>(pathOrUrl: string): Observable<HttpEvent<T>>;
  public options<T>(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.options<T>(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'events',
      })
    );
  }

  public optionsText(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'events',
      })
    );
  }

  public optionsBlob(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'events',
      })
    );
  }

  public optionsArrayBuffer(pathOrUrl: string) {
    return this.enhance.bind(this._client)(
      this.http.options(this.resolveUrl(pathOrUrl), {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'events',
      })
    );
  }

  public put(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpEvent<Object>>;
  public put<T>(pathOrUrl: string, body: any | null): Observable<HttpEvent<T>>;
  public put<T>(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.put<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'events',
      })
    );
  }

  public putText(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'events',
      })
    );
  }

  public putBlob(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'events',
      })
    );
  }

  public putArrayBuffer(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.put(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'events',
      })
    );
  }

  public post(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpEvent<Object>>;
  public post<T>(pathOrUrl: string, body: any | null): Observable<HttpEvent<T>>;
  public post<T>(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.post<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'events',
      })
    );
  }

  public postText(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'events',
      })
    );
  }

  public postBlob(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'events',
      })
    );
  }

  public postArrayBuffer(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.post(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'events',
      })
    );
  }

  public patch(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpEvent<Object>>;
  public patch<T>(
    pathOrUrl: string,
    body: any | null
  ): Observable<HttpEvent<T>>;
  public patch<T>(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.patch<T>(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'json',
        observe: 'events',
      })
    );
  }

  public patchText(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'text',
        observe: 'events',
      })
    );
  }

  public patchBlob(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'blob',
        observe: 'events',
      })
    );
  }

  public patchArrayBuffer(pathOrUrl: string, body: any | null) {
    return this.enhance.bind(this._client)(
      this.http.patch(this.resolveUrl(pathOrUrl), body, {
        ...this._config.getHttpOptions(),
        responseType: 'arraybuffer',
        observe: 'events',
      })
    );
  }
}
