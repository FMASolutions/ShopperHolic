import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) {
    this._authService = authService;
  }
  pageTitle: string = "Mirpur PVC";
  _authService: AuthService;
  getLoginStatus(){
    return this._authService.userIsLoggedIn;
  }
  ngOnInit() {
  }

}
