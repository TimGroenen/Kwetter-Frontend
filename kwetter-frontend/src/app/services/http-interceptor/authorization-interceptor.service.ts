import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptorService implements HttpInterceptor {

    // @Inject is necessary because the service won't yet be officially loaded when the HttpInterceptor is instantiated
    constructor(@Inject(forwardRef(() => AuthService)) private authManager: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authManager.getAccountToken();
        let clonedRequest: HttpRequest<any>;
        if (authToken) {
            clonedRequest = req.clone({
                headers: new HttpHeaders({
                    'Authorization': authToken, 
                    "Arr-Disable-Session-Affinity": "True"
                })
            });
        } else {
            clonedRequest = req.clone({headers: req.headers.set("Arr-Disable-Session-Affinity", "True")});
        }
        return next.handle(clonedRequest);
    }
}
