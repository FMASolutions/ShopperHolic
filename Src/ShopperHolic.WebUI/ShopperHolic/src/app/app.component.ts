import { Component } from '@angular/core';
import { AuthenticatedUserModel } from './models/security/authenticatedUserModel';
import { AuthService } from './services/security/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ShopperHolic';
  currentUser: AuthenticatedUserModel = null;
  env = environment

  constructor(private authService: AuthService) {
    this.currentUser = authService.currentUser;
  }
}
