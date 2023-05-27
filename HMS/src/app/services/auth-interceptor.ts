import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class authInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor');
    let modifiedRequest = req.clone({
      headers: req.headers
        .append('authorization', `${localStorage.getItem('token')}`)
        // .append('hyy', 'hero'),
    });
    return next.handle(modifiedRequest);
  }
}
