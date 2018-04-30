import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercepted request ... ');

    // let url: string;
    if (req.url.startsWith('http')) {
      // url = req.url;
    } else {
      // url = `https://dev.samsunggearup.com/api/v2${req.url}`;
    }
    // Clone the request to add the new header.
    const authReq = req.clone({
      // headers: req.headers.set('headerName', 'headerValue'),
      url: req.url
    });

    console.log('Sending request with new header now ...');

    // send the newly created request
    return next.handle(authReq);
  }
}
