import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }
  pageTitle: string = "Mirpur PVC";
  getLoginStatus() {
    if (this.authService.currentUser && this.authService.currentUser.isAuthenticated) { return true; }
    else { return false; }
  }
  ngOnInit() {
  }

  logout() {
    this.authService.logoutExistingUser();
  }

}
