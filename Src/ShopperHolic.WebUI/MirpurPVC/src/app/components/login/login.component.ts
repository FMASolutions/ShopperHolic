import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedUserModel } from 'src/app/models/authenticatedUserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: AuthenticatedUserModel = null;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  usernameInput: string = "";
  passwordInput: string = "";
  returnMessage: string = "";
  returnUrl: string = "";

  attemptLogin() {
    this.authService.attemptLogin(this.usernameInput, this.passwordInput).subscribe(resp => {
      this.currentUser = resp;
      if (this.returnUrl) { this.router.navigateByUrl(this.returnUrl); }
      else { this.router.navigateByUrl("/home"); }
    }, (error) => {
      this.returnMessage = "Invalid Credentials. Please try again";
    })
  }

}