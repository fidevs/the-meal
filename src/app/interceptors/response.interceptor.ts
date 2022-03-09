import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private snackBarService: SnackbarService) { } // TODO: Fix SnackBarService error

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.handleError));
  }


  handleError(httpError: HttpErrorResponse) {
    console.log({ httpError });
    if (httpError.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', httpError.error);
      //this.snackBarService.open("Ocurrio un error con la petición", "OK", 2000);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, body was: `, httpError.error);
      console.log({ httpError });
      if (httpError instanceof HttpErrorResponse) {
        console.log("instanceof HttpErrorResponse");
        switch (httpError.status) {
          case 400:
            // this.snackBarService.open("Petición rechazada, intente más tarde", "OK", 2000);
            break;

          case 404:
            // this.snackBarService.open("No se encontró el recurso solicitado", "OK", 3000);
            break;
          default:
            return throwError(httpError);
            break;
        }
      }
    }
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));
    return throwError(httpError);
  }
}

