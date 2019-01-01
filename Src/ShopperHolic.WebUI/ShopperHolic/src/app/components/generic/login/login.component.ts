import { Component, Inject } from '@angular/core';
import { AuthenticatedUserModel } from 'src/app/models/security/authenticatedUserModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/security/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthValidator } from 'src/app/services/security/auth.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  currentUser: AuthenticatedUserModel = null;

  constructor(private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LoginComponent>) {
    this.currentUser = this.authService.currentUser;
    this.authService.setupLoginForm();
  }

  attemptLoginClicked() {
    if (this.authService.loginForm.valid) {
      let obsAuth = this.authService.attemptLogin(this.authService.loginForm.value["username"], this.authService.loginForm.value["password"]).subscribe(resp => {
        obsAuth.unsubscribe();
        let obsExchange = this.authService.exchangeKeyForToken(resp).subscribe(userResp => {
          obsExchange.unsubscribe();
          this.dialogRef.close(userResp);
        })
      });
    }
  }

  cancelLoginClicked() { this.dialogRef.close({ userCancelled: true }); }
}