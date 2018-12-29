import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/components/generic/login/login.component';
import { Globals } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router, private loginDialog: MatDialog) { }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let claimType: string = next.data["claimType"];
    let hasAccess: boolean = false;
    if (this.authService.currentUser) {
      if (this.authService.currentUser.userClaims && this.authService.hasClaim(claimType)) { hasAccess = true; }
    }
    if (hasAccess) { return true; }
    else { //User isn't authorized to access the URL in the parameter, redirect to login page with a message to say they are not authorized.... 
      
    let dialogRef = this.loginDialog.open(LoginComponent,Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(returnedData => {
      if(returnedData.isAuthenticated) //User actually logged in
        this.router.navigateByUrl(state.url);
      else //User cancelled the login dialog.
        return false;
    });
    };
    return false;
  }
}
