import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

    constructor(
        private _loginService: LoginService,
        private router: Router
      ) {}

      canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ): Observable<boolean> | Promise<boolean> | boolean {
        if (this._loginService.isUserLoggedIn) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }
}