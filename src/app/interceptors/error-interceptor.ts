import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        errorService.setError('Network error. Please check your connection.');
      } else if (error.status === 404) {
        errorService.setError('The requested data could not be found.');
      } else if (error.status >= 500) {
        errorService.setError('Server error. Please try again later.');
      } else {
        errorService.setError('Something went wrong while loading the data.');
      }

      return throwError(() => error);
    })
  )
}
