import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor {
   numRequest: number = 0;
   constructor() {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const Authorization = `Bearer ${environment.token_access}`;
      
      if (Authorization) {
         req = req.clone({
            setHeaders: {
               Authorization,
            },
         });
      }
      
      return next.handle(req);
   }
}
