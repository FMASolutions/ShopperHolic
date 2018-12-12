import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let claimType: string = next.data["claimType"];
    let hasAccess: boolean = false;
    if (this.authService.currentUser)
      if (this.authService.currentUser.userClaims && this.authService.hasClaim(claimType))
        hasAccess = true;
    if (hasAccess) { return true; }
    else if (this.authService.currentUser && this.authService.currentUser.isAuthenticated) {this.router.navigate(['unauthorized']); }
    else
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
