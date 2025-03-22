import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';  // Ensure this path is correct
import { loaderInterceptorInterceptor } from './core/interceptor/loader.interceptor';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loaderInterceptorInterceptor]),withFetch()),  // Provides HTTP client for API calls
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => loaderInterceptorInterceptor,  // Use the interceptor function directly
      multi: true,  // Ensures it's added to the existing chain of interceptors
    },
    importProvidersFrom(BrowserAnimationsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),  // Optimizes event handling
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right', // Position at the top center
      timeOut: 3000, // Auto-close after 3 seconds
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      newestOnTop: true,
      preventDuplicates: true, // Prevent duplicate messages
      extendedTimeOut: 1000, // Additional time to show after hover
      enableHtml: true, // Allow HTML in messages
    })
  ],
};
