import { Component } from '@angular/core';
import { AuthenticatedUserModel } from './models/security/authenticatedUserModel';
import { AuthService } from './services/security/auth.service';
import { Globals } from 'src/globals';
import { ContentService } from './services/generic/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  currentUser: AuthenticatedUserModel = null;
  getApptitle() {
    return this.contentService.curAppConfig.appShortName + ' - ' + this.contentService.curAppConfig.appSlogan
  }
  constructor(authService: AuthService, public contentService: ContentService) {
    this.currentUser = authService.currentUser;
    let obs = this.contentService.getSiteConfig().subscribe(() => {
      obs.unsubscribe();
    })
  }
}
