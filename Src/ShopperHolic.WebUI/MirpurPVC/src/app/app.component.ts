import { Component } from '@angular/core';
import { AuthService } from './services/security/auth.service';
import { AuthenticatedUserModel } from './models/authenticatedUserModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mirpur PVC';
  currentUser: AuthenticatedUserModel = null;

  constructor(private authService: AuthService) {
    this.currentUser = authService.currentUser;
  }

  logout(): void {
    this.authService.logoutExistingUser();
  }
}
