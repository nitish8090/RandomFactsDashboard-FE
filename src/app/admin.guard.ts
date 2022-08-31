import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()){
      return true
    } else {
      this.router.navigate([''])
      return false
    }
  }
}
