import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/security/auth.service';
import { AuthenticatedUserModel } from 'src/app/models/security/authenticatedUserModel';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  currentUser: AuthenticatedUserModel = null;
  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.currentUser;
  }

  pageTitle: string = "Mirpur PVC";

  getUserName(): string {
    let returnString = this.authService.currentUser.isAuthenticated ? this.authService.currentUser.username : "";
    return returnString;
  }
  logout(): void {
    this.authService.logoutExistingUser();
    this.router.navigateByUrl('/home');
  }

}
