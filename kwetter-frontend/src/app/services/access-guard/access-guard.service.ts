import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService {
  constructor(private authManager: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
      const requiresLogin = route.data.requiresLogin || false;
      if (requiresLogin) {
          const loggedIn = this.authManager.getAccountToken();
          if (loggedIn) {
              return true;
          } else {
              this.router.navigate(['/login']);
          }
      }
      return true;
  }
}
