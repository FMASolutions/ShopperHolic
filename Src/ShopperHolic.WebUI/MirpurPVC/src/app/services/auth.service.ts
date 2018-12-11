import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  userIsLoggedIn: boolean = false;
  loginEndpoint: string = 'https://localhost:5001/api/Auth/AttemptAuthentication';
  httpOptions: object = {
    headers: new HttpHeaders({
      contentType:'application/json'
    })
  };

  attemptLogin(username, password){
    var authRequestObject = {
      usernameInput: username,
      passwordInput: password 
    };
    
    let obs = this.http.post(this.loginEndpoint,authRequestObject);
    obs.subscribe((response) => console.log(response));
  }
}
