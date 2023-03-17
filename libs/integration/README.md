# VTS Kit Angular Utilities (Integration)

## Installation

```
npm install @vts-kit/angular-integration
```

## Guideline

### Google Analytics

This module help adding Google Analytics to project with ease

**Import**

```
// app.module.ts
import { VtsGoogleAnalyticsModule } from '@vts-kit/angular-integration'

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...,
    VtsGoogleAnalyticsModule.forRoot({id: <google_tracking_id>}),
  ]
})
export class AppModule {}
```