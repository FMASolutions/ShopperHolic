import { Injectable } from '@angular/core';
import { AuthenticatedUserModel } from '../models/authenticatedUserModel';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { UserClaim } from '../models/userClaim';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    let existingToken = localStorage.getItem("bearerToken");
    if (existingToken) {
      this.currentUser = new AuthenticatedUserModel();
      this.currentUser.isAuthenticated = true;
      this.currentUser.bearerToken = existingToken;
      this.currentUser.username = localStorage.getItem("username");
      this.getUserClaims(this.currentUser.username).subscribe(resp => { this.currentUser.userClaims = resp; });
    }
  }

  baseURL: string = 'https://localhost:5001/api/Auth/';
  currentUser: AuthenticatedUserModel = null;

  attemptLogin(username, password): Observable<AuthenticatedUserModel> {
    let authRequestObject = {
      usernameInput: username,
      passwordInput: password
    };

    return this.http.post<AuthenticatedUserModel>(this.baseURL + "AttemptAuthentication", authRequestObject).pipe(tap(resp => {
      if (this.currentUser) { Object.assign(this.currentUser, resp); }
      else { this.currentUser = resp; }
      localStorage.setItem("bearerToken", resp.bearerToken);
      localStorage.setItem("username", resp.username);
      this.getUserClaims(this.currentUser.username);
    }));
  }

  getUserClaims(username): Observable<UserClaim[]> {
    /*let authHeader = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.currentUser.bearerToken);*/
    let formattedURL = this.baseURL + "GetUserClaims/?username=\"" + username + "\""
    return this.http.get<UserClaim[]>(formattedURL).pipe(tap(resp => {
      if (this.currentUser.userClaims) { Object.assign(this.currentUser.userClaims, resp); }
      else { this.currentUser.userClaims = resp; }
      return resp;
    }));
  }

  logoutExistingUser() {
    this.currentUser = new AuthenticatedUserModel();
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("username");
  }
}
