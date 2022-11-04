import { HttpHeaders, HttpParams } from '@angular/common/http';

export type RestClientHttpOptions = {
  headers: HttpHeaders;
  params: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
};

export class RestClientOptions {
  private _headers: HttpHeaders = new HttpHeaders();
  private _params: HttpParams = new HttpParams();
  private _withCredentials?: boolean;
  private _reportProgress?: boolean;
  private _timeout: number = 60000;
  private _retry: number = 0;
  private _baseUrl: string = '';

  constructor() {}

  static from(config: RestClientOptions) {
    const newObj = new RestClientOptions();
    newObj._headers = config._headers;
    newObj._params = config._params;
    newObj._withCredentials = config._withCredentials;
    newObj._reportProgress = config._reportProgress;
    newObj._timeout = config._timeout;
    newObj._retry = config._retry;
    newObj._baseUrl = config._baseUrl;
    return newObj;
  }

  public setHeader(key: string, value: string) {
    if (this._headers.has(key)) {
      this._headers = this._headers.set(key, value);
    } else {
      this._headers = this._headers.append(key, value);
    }
    return this;
  }

  public setHeaders(headers: { [key: string]: string }) {
    Object.entries(headers).forEach(([k, v]) => this.setHeader(k, v));
    return this;
  }

  public removeHeader(key: string) {
    this._headers = this._headers.delete(key);
    return this;
  }

  public setParam(key: string, value: string) {
    if (this._params.has(key)) {
      this._params = this._params.set(key, value);
    } else {
      this._params = this._params.append(key, value);
    }
    return this;
  }

  public setParams(params: { [key: string]: string }) {
    Object.entries(params).forEach(([k, v]) => this.setParam(k, v));
    return this;
  }

  public removeParam(key: string) {
    this._params = this._params.delete(key);
    return this;
  }

  public setWithCredentials(enable: boolean) {
    this._withCredentials = enable;
    return this;
  }

  public setReportProgress(enable: boolean) {
    this._reportProgress = enable;
    return this;
  }

  public setRetry(retry: number) {
    if (retry < 0) throw new Error('Invalid option for [retry] option');
    this._retry = retry;
    return this;
  }

  public setTimeout(timeout: number) {
    if (timeout <= 0) throw new Error('Invalid option for [timeout] option');
    this._timeout = timeout;
    return this;
  }

  public setBaseUrl(url: string) {
    if (url.endsWith('/')) this._baseUrl = url.replace(/.$/, '');
    else this._baseUrl = url;
    return this;
  }

  public getHeaders = () => this._headers;

  public getParams = () => this._params;

  public getWithCredentials = () => this._withCredentials;

  public getReportProgress = () => this._reportProgress;

  public getTimeout = () => this._timeout;

  public getRetry = () => this._retry;

  public getBaseUrl = () => this._baseUrl;

  public getHttpOptions: () => RestClientHttpOptions = () => ({
    headers: this.getHeaders(),
    params: this.getParams(),
    reportProgress: this.getReportProgress(),
    withCredentials: this.getWithCredentials(),
  });
}
