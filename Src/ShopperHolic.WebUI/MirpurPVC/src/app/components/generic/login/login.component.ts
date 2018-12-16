import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedUserModel } from 'src/app/models/security/authenticatedUserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: AuthenticatedUserModel = null;
  usernameInput: string = "";
  passwordInput: string = "";
  statusMessage: string = "";
  returnUrl: string = "";

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  attemptLogin() {
    this.authService.attemptLogin(this.usernameInput, this.passwordInput).subscribe(resp => {
      this.authService.exchangeKeyForToken(resp).subscribe(userResp => {
        this.returnUrl ? this.router.navigateByUrl(this.returnUrl) : this.router.navigateByUrl("/home");
      }
        , (tokenExchangeError) => { this.statusMessage = "Login Failed. Please retry shortly"; }
      )
    }, (loginError) => { this.statusMessage = "Invalid User Credentials"; });
    this.statusMessage = "Processing Login Request...";
  }
}