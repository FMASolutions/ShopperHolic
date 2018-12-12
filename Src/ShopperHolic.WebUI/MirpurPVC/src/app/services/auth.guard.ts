import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let claimType: string = next.data["claimType"];
      let hasAccess: boolean = false;
      if(this.authService.currentUser)
        if(this.authService.currentUser.userClaims)
          this.authService.currentUser.userClaims.forEach(claim => 
          {  
            if (claim.claimType === claimType)
              if(claim.claimValue === "true")
                hasAccess = true;
          });
      return this.authService.currentUser 
        && this.authService.currentUser.isAuthenticated 
        && hasAccess;
  }
}
