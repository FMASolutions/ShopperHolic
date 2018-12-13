import { Injectable } from '@angular/core';
import { AuthenticatedUserModel } from '../models/authenticatedUserModel';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL: string = 'https://localhost:5001/api/Auth/';
  currentUser: AuthenticatedUserModel = new AuthenticatedUserModel();

  constructor(private http: HttpClient) {
    let existingToken = localStorage.getItem("bearerToken");
    if (existingToken) { //PROBABLY SHOULD CHECK THE EXPIRY TIME ON THE TOKEN>>>>>>>>>
      let storedUser: AuthenticatedUserModel = this.getUserFromStorage();
      this.currentUser = new AuthenticatedUserModel();
      this.currentUser.isAuthenticated = storedUser.isAuthenticated;
      this.currentUser.bearerToken = storedUser.bearerToken;
      this.currentUser.username = storedUser.username;
      this.currentUser.userClaims = storedUser.userClaims;
    }
  }

  attemptLogin(username, password): Observable<AuthenticatedUserModel> {
    let authRequestObject = {
      usernameInput: username,
      passwordInput: password
    };

    return this.http.post<AuthenticatedUserModel>(this.authURL + "AttemptAuthentication", authRequestObject).pipe(tap(resp => {
      if (this.currentUser) { Object.assign(this.currentUser, resp); }
      else { this.currentUser = resp; }
      console.log(resp);
      this.storeUserLocally(resp);
    }));
  }

  resetCurrentUser() {
    this.currentUser.username = "";
    this.currentUser.userClaims = [];
    this.currentUser.isAuthenticated = false;
    this.currentUser.bearerToken = "";
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userClaims");
  }

  storeUserLocally(userToStore: AuthenticatedUserModel) {
    localStorage.setItem("bearerToken", userToStore.bearerToken);
    localStorage.setItem("username", userToStore.username);
    localStorage.setItem("userClaims", JSON.stringify(userToStore.userClaims));
  }

  getUserFromStorage(): AuthenticatedUserModel {
    let returnObject: AuthenticatedUserModel = new AuthenticatedUserModel();
    returnObject.bearerToken = localStorage.getItem("bearerToken");
    returnObject.isAuthenticated = true;
    returnObject.username = localStorage.getItem("username");
    returnObject.userClaims = JSON.parse(localStorage.getItem("userClaims"));
    return returnObject;
  }

  logoutExistingUser() {
    this.resetCurrentUser();
  }

  /*-----------------------------------------------
   * WHEN PASSING AN ARRAY ONLY 1 Claim needs to return TRUE
   * BEHAVES LIKE "OR" NOT LIKE "AND"
   * *hasClaim="'claimType"
   * *hasClaim="'claimType:value'"
   * *hasClaim="['claimType','claimType:value','claimType']"
   * --------------------------------------------*/
  hasClaim(claimType: any, claimValue?: any) {
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