import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request)
    const AUTHORIZATION = this.auth.authorization;
    const modifiedRequest = request.clone({
      setHeaders:{
        AUTHORIZATION
      }
    })
    return next.handle(modifiedRequest);

    // request.headers = this.auth.headers
    // return next.handle(request)
  }
}