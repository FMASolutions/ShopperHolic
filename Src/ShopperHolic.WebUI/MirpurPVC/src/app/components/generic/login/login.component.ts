import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedUserModel } from 'src/app/models/security/authenticatedUserModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthValidator } from 'src/app/services/security/auth.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: AuthenticatedUserModel = null;
  statusMessage: string = "";
  returnUrl: string = "";
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router
    , private route: ActivatedRoute, private fb: FormBuilder, private authValidator: AuthValidator) {
    this.currentUser = this.authService.currentUser;
    this.loginForm = fb.group({
      username: [null, [authValidator.ValidateUsername]],
      password: [null, [authValidator.ValidatePassword]]
    });
    console.log(this.loginForm);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  attemptLogin() {
    if (this.loginForm.valid) {
      this.authService.attemptLogin(this.loginForm.value["username"], this.loginForm.value["password"]).subscribe(resp => {
        this.authService.exchangeKeyForToken(resp).subscribe(userResp => {
          this.returnUrl ? this.router.navigateByUrl(this.returnUrl) : this.router.navigateByUrl("/home");
        }
          , (tokenExchangeError) => { this.statusMessage = "Login Failed. Please retry shortly"; console.log(tokenExchangeError); }
        )
      }, (loginError) => { this.statusMessage = "Invalid User Credentials"; console.log(loginError); });
      this.statusMessage = "Processing Login Request...";
    }
    else {
      this.statusMessage = "Please fill out details before proceeding"
    }
  }
}