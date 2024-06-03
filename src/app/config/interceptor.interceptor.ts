import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = httpRequest.clone({
      headers: httpRequest.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"))
    });
    return next.handle(authReq);
  }
}
