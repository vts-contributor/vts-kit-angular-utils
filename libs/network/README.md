# VTS Kit Angular Utilities (Network)

## Installation

```
npm install @vts-kit/angular-network
```

## Guideline

### RestClient

RestClient provide abilities to interact with RESTful API through builder pattern.

**Import**

```
// app.module.ts
import { VtsRestModule, RestClientOptions, VtsRestModuleConfig } from "@vts-kit/angular-network"

// Default config
const NETWORK_MODULE_CONFIG: VtsRestModuleConfig = {
  defaultConfig: new RestClientOptions()
    .setBaseUrl('https://<base_api_url>')
    .setHeader('<key>', '<value>')
    .setParam('<key>', '<value>')
    .setRetry(3),
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...,
    VtsRestModule.forRoot(NETWORK_MODULE_CONFIG)
    // Without default config
    // VtsRestModule.forRoot()
  ]
})
export class AppModule {}
```

**Usage**

Pattern:

```
client
  .setHeader("key", "value")
  .setTimeout(60000)
  ... // More builder
  .obserseBody() // or obserseEvents() or obserseResponse()
  .get("<path or url>") // or post, patch, put, options, delete
  .subscribe(...)
```

Example:

```
// name.any.ts
@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(private client: RestClient) {}

  callApi() {
    this.client
      .obserseBody()
      .get<Post[]>('/posts')
      .subscribe({
        next: (d) => console.log(d[0].title),
        error: (e) => console.log(e),
      });
  }
}
```

---

### NetworkUtils

Provide some useful function to interact with network state, data...

| No  | Function Name | Description                          | Output              |
| --- | ------------- | ------------------------------------ | ------------------- |
| 1   | online$       | Return observable to network status  | Observable<boolean> |
| 2   | isOnline      | Return current network active status | boolean             |
