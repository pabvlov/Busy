import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from '../services/user.service';
import { SwalService } from '../services/swal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private swal: SwalService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.swal.authFail(error.error.message)

        return throwError(error);
        
      }))
  }
}

