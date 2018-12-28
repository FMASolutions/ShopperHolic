import { Component } from '@angular/core';
import { AuthenticatedUserModel } from './models/security/authenticatedUserModel';
import { AuthService } from './services/security/auth.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  currentUser: AuthenticatedUserModel = null;
  getApptitle() {
    return Globals.APP_SETTINGS.appTitle
  }
  constructor(authService: AuthService) {
    this.currentUser = authService.currentUser;
  }
}
