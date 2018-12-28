import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticatedUserModel } from 'src/app/models/security/authenticatedUserModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/security/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthValidator } from 'src/app/services/security/auth.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StatusMessageService } from 'src/app/services/status-message.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: AuthenticatedUserModel = null;
  returnUrl: string = "";
  loginForm: FormGroup;

  constructor(private sms: StatusMessageService, private authService: AuthService, private router: Router, private route: ActivatedRoute, fb: FormBuilder, authValidator: AuthValidator, public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = this.authService.currentUser;
    this.loginForm = fb.group({
      username: [null, [authValidator.ValidateUsername]],
      password: [null, [authValidator.ValidatePassword]]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  attemptLogin() {
    if (this.loginForm.valid) {
      this.authService.attemptLogin(this.loginForm.value["username"], this.loginForm.value["password"]).subscribe(resp => {
        this.authService.exchangeKeyForToken(resp).subscribe(userResp => {
          if (this.returnUrl) { this.router.navigateByUrl(this.returnUrl); } //Go to return url or home after login
          this.dialogRef.close(userResp);
        }
          , (tokenExchangeError) => {
            this.sms.currentMessage.setDangerMessage(Globals.LOGIN_FAILED_MESSAGE);
          }
        )
      }, (loginError) => {
        this.sms.currentMessage.setDangerMessage(Globals.LOGIN_FAILED_MESSAGE);
      });
    }
    else {

    }
  }

  cancelLogin() {
    this.dialogRef.close({
      userCancelled: true
    });
  }
}