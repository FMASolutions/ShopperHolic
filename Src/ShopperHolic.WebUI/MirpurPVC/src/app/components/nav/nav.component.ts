import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthenticatedUserModel } from 'src/app/models/authenticatedUserModel';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: AuthenticatedUserModel = null;
  constructor(private authService: AuthService, private router: Router) { 
    this.currentUser = this.authService.currentUser;
  }

  pageTitle: string = "Mirpur PVC";

  ngOnInit() {
  }
  getUserName(){
    if(this.authService.currentUser && this.authService.currentUser.isAuthenticated) { return this.authService.currentUser.username;}
    else { return ""; }
  }
  logout() {
    this.authService.logoutExistingUser();
    this.router.navigateByUrl('/home');
  }

}
