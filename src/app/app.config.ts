import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { HeadersInterceptor } from './services/my-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(), 
    importProvidersFrom(HttpClientModule), 
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true
    }
  
  ]
};
