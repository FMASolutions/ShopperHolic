import { Injectable } from '@angular/core';
import { AuthenticatedUserModel } from '../../models/security/authenticatedUserModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from 'src/globals';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthValidator } from './auth.validator';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public currentUser: AuthenticatedUserModel = new AuthenticatedUserModel();
  public loginForm: FormGroup;

  private returnUrl: string = "";
  private lastUsernameRequested: string = "";
  private authURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Auth/';


  constructor(private http: HttpClient,
    private cookie: CookieService,
    private userNotificationServ: UserNotificationService,
    private authValidator: AuthValidator,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {

    this.checkUserInCookies();
    this.setupLoginForm();

  }

  public setupLoginForm() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.loginForm = this.fb.group({
      username: [null, [this.authValidator.ValidateUsername]],
      password: [null, [this.authValidator.ValidatePassword]]
    });
  }

  public attemptLogin(username, password): Observable<string> {
    this.userNotificationServ.informUserStart(Globals.LOGIN_ATTEMPT_MSG + username, Globals.SPINNER_LOGIN_MSG);
    let authRequestObject = {
      Username: username,
      UserInputPasswordPlainText: password
    };
    this.lastUsernameRequested = username;
    return this.http.post<string>(this.authURL + "AttemptAuthentication", authRequestObject).pipe(tap(() => { }, (err) => {
      this.userNotificationServ.informUserError(Globals.LOGIN_FAILED_MSG + " " + username);  //Close because error, handle success in key exchange.
    }));
  }

  public exchangeKeyForToken(key: string): Observable<AuthenticatedUserModel> {
    return this.http.get<AuthenticatedUserModel>(this.authURL + "TokenExchange?exchangeKey=" + key + "&username=" + this.lastUsernameRequested)
      .pipe(tap(resp => {
        //Use Object.assigs so external services / components which 
        //have registered their current user reference to 
        //the authService.currentUser by doing "this.currentUser = resp" 
        Object.assign(this.currentUser, resp);
        this.storeUserToStorage(resp);

        this.userNotificationServ.informUserComplete(Globals.LOGIN_SUCCESS_MSG + resp.username);
        if (this.returnUrl) { this.router.navigateByUrl(this.returnUrl); } //Go to return url or home after login
      }, (erro) => {
        this.userNotificationServ.informUserError(Globals.LOGIN_FAILED_MSG);
      }));
  }

  public refreshToken(): Observable<AuthenticatedUserModel> {
    return this.http.post<AuthenticatedUserModel>(this.authURL + "TokenRefresh", this.currentUser).pipe(tap(userResp => {
      Object.assign(this.currentUser, userResp);
      this.storeUserToStorage(userResp);
    }));
  }

  public logoutExistingUser() {
    this.resetCurrentUser();
    this.removeUserFromStorage();
  }

  /*-----------------------------------------------
 * WHEN PASSING AN ARRAY ONLY 1 Claim needs to return TRUE
 * BEHAVES LIKE "OR" NOT LIKE "AND"
 * *hasClaim="'claimType"
 * *hasClaim="'claimType:value'"
 * *hasClaim="['claimType','claimType:value','claimType']"
 * --------------------------------------------*/
  public hasClaim(claimType: any, claimValue?: any) {
    let returnValue: boolean = false;
    if (typeof claimType === "string") { returnValue = this.isClaimValid(claimType, claimValue); }
    else {
      let claims: string[] = claimType;
      if (claims && claims.length > 0) {
        for (let index = 0; index < claims.length; index++) {
          returnValue = this.isClaimValid(claims[index]);
          if (returnValue) {
            break;
          }
        }
      }
    }
    return returnValue;
  }

  private resetCurrentUser() {
    this.currentUser.username = "";
    this.currentUser.userClaims = [];
    this.currentUser.isAuthenticated = false;
    this.currentUser.bearerToken = "";
    this.currentUser.refreshToken = "";
  }

  private storeUserToStorage(userToStore: AuthenticatedUserModel) {
    this.cookie.set("bearerToken", userToStore.bearerToken);
    this.cookie.set("username", userToStore.username);
    this.cookie.set("userClaims", JSON.stringify(userToStore.userClaims));
    this.cookie.set("refreshToken", JSON.stringify(userToStore.refreshToken));
  }

  private removeUserFromStorage() {
    this.cookie.delete("bearerToken");
    this.cookie.delete("username");
    this.cookie.delete("userClaims");
    this.cookie.delete("refreshToken");
  }

  private checkUserInCookies() {
    let existingToken = this.cookie.get("bearerToken");
    if (existingToken) {
      Object.assign(this.currentUser, this.getUserFromStorage());
    }
  }

  private getUserFromStorage(): AuthenticatedUserModel {
    let returnObject: AuthenticatedUserModel = new AuthenticatedUserModel();
    returnObject.bearerToken = this.cookie.get("bearerToken");
    returnObject.isAuthenticated = true;
    returnObject.username = this.cookie.get("username");
    returnObject.userClaims = JSON.parse(this.cookie.get("userClaims"));
    returnObject.refreshToken = JSON.parse(this.cookie.get("refreshToken"));
    return returnObject;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let returnValue: boolean = false;
    let auth: AuthenticatedUserModel = null;
    auth = this.currentUser;
    if (auth) {
      if (claimType.indexOf(":") >= 0) {
        let words: string[] = claimType.split(":");
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      }
      else {
        claimType = claimType.toLowerCase();
        claimValue = claimValue ? claimValue : "true";
      }
      returnValue = auth.userClaims.find(c => c.claimType.toLocaleLowerCase() == claimType && c.claimValue == claimValue) != null;
    }
    return returnValue;
  }
}