import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { CommonService } from './services/common.service';
import { loaderInterceptorInterceptor } from './loader-interceptor.interceptor';  // Ensure this path is correct

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loaderInterceptorInterceptor])),  // Provides HTTP client for API calls
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => loaderInterceptorInterceptor,  // Use the interceptor function directly
      multi: true,  // Ensures it's added to the existing chain of interceptors
    },
    provideZoneChangeDetection({ eventCoalescing: true }),  // Optimizes event handling
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(CommonService),
  ],
};
