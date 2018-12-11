import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService
    , private router: Router
    , private route: ActivatedRoute) { }
 
  ngOnInit() {
    
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  usernameInput: string = "";
  passwordInput: string = "";
  returnMessage: string = "";
  returnUrl: string = "";

  attemptLogin(){
    this.authService.attemptLogin(this.usernameInput,this.passwordInput).subscribe(resp => {
      if(this.returnUrl)
      {
        this.router.navigateByUrl(this.returnUrl);
      }
      else
      {
        this.router.navigateByUrl("/about");
      }
    }, (error) => {
      console.log("caught error: " + error);
      this.returnMessage = "Invalid Credentials. Please try again";
    })
  } 

}