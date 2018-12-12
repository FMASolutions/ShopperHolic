import { Injectable } from '@angular/core';
import { AuthenticatedUserModel } from '../models/authenticatedUserModel';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { UserClaim } from '../models/userClaim';
import { store } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: AuthenticatedUserModel = new AuthenticatedUserModel();
  constructor(private http: HttpClient) {
    let existingToken = localStorage.getItem("bearerToken");
    if (existingToken) { //PROBABLY SHOULD CHECK THE EXPIRY TIME ON THE TOKEN>>>>>>>>>
      let storedUser : AuthenticatedUserModel = this.getUserFromStorage();
      this.currentUser = new AuthenticatedUserModel();
      this.currentUser.isAuthenticated = storedUser.isAuthenticated;
      this.currentUser.bearerToken = storedUser.bearerToken;
      this.currentUser.username = storedUser.username;
      this.currentUser.userClaims = storedUser.userClaims;
    }
  }

  baseURL: string = 'https://localhost:5001/api/Auth/';

  attemptLogin(username, password): Observable<AuthenticatedUserModel> {
    let authRequestObject = {
      usernameInput: username,
      passwordInput: password
    };

    return this.http.post<AuthenticatedUserModel>(this.baseURL + "AttemptAuthentication", authRequestObject).pipe(tap(resp => {
      if (this.currentUser) { Object.assign(this.currentUser, resp); }
      else { this.currentUser = resp; }
      this.storeUserLocally(resp);
    }));
  }

  private getUserClaims(username): Observable<UserClaim[]> {
    let formattedURL = this.baseURL + "GetUserClaims/?username=\"" + username + "\""
    return this.http.get<UserClaim[]>(formattedURL).pipe(tap(resp => {
      if (this.currentUser.userClaims) { Object.assign(this.currentUser.userClaims, resp); }
      else { this.currentUser.userClaims = resp; }
      return resp;
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
  storeUserLocally(userToStore: AuthenticatedUserModel){
    localStorage.setItem("bearerToken", userToStore.bearerToken);
    localStorage.setItem("username", userToStore.username);
    localStorage.setItem("userClaims",JSON.stringify(userToStore.userClaims));
  }
  getUserFromStorage() : AuthenticatedUserModel{
    let returnObject : AuthenticatedUserModel = new AuthenticatedUserModel();
    returnObject.bearerToken = localStorage.getItem("bearerToken");
    returnObject.isAuthenticated = true;
    returnObject.username = localStorage.getItem("username");
    returnObject.userClaims = JSON.parse(localStorage.getItem("userClaims"));
    return returnObject;

  }

  logoutExistingUser() {
    this.resetCurrentUser();
  }
  hasClaim(claimType: any, claimValue?: any){
    return this.isClaimValid(claimType,claimValue);
  }
  private isClaimValid(claimType: string, claimValue?: string): boolean{
    let returnValue: boolean = false;
    let auth: AuthenticatedUserModel = null;
    auth = this.currentUser;
    if(auth){
      if(claimType.indexOf(":") >= 0) {
        let words: string[] = claimType.split(":");
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      }
      else{
        claimType = claimType.toLowerCase();
        claimValue = claimValue ? claimValue : "true";
      }
      returnValue = auth.userClaims.find(c => c.claimType.toLocaleLowerCase() == claimType && c.claimValue == claimValue) != null;
    }
    return returnValue;
  }
}
