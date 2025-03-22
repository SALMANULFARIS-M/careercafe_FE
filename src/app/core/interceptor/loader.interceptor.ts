import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';  // Ensure this path is correct
import { finalize } from 'rxjs/operators';

export const loaderInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);  // Inject LoaderService
  // Show the loader when a request is made
  loaderService.show();
  return next(req).pipe(
    finalize(() => {
      // Hide the loader once the request is completed (either success or error)
      loaderService.hide();
    })
  );
};

