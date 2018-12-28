import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticatedUserModel } from '../models/security/authenticatedUserModel';
import { AuthService } from '../services/security/auth.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../components/generic/login/login.component';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    [
      Breakpoints.HandsetPortrait,
      Breakpoints.Handset,
      Breakpoints.TabletPortrait
    ]
  )
    .pipe(map(result => result.matches));
  currentUser: AuthenticatedUserModel = null;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, public loginDialog: MatDialog) {
    this.currentUser = this.authService.currentUser;
  }

  getAppName(){
    return Globals.APP_SETTINGS.appTitle;  
  }
  getAppShortName(){
    return Globals.APP_SETTINGS.appTitleShort;
  }

  getUserName(): string {
    return this.authService.currentUser.isAuthenticated ? this.authService.currentUser.username : "";
  }

  logout(): void {
    this.authService.logoutExistingUser();
  }
  
  openLoginDialog(){
    let dialogRef = this.loginDialog.open(LoginComponent,Globals.APP_SETTINGS.defaultModalSettings);
  }

  toggleChildVisibility(event: MouseEvent){
    let childOrderedList = event.srcElement.parentElement.parentElement.children.item(1);
    if(childOrderedList == null) //User Clicked the icon and not the mat-list-item directly so we need another generation ihgher (+.parent);
      childOrderedList = event.srcElement.parentElement.parentElement.parentElement.children.item(1);
    

    let iconElement = childOrderedList.parentElement.children.item(0).children.item(0).children.item(2);

    
    console.log(parent);
    if(childOrderedList.classList.contains("hide")){
      childOrderedList.classList.remove("hide");
      iconElement.innerHTML = "arrow_drop_down"
    } else{
      childOrderedList.classList.add("hide");
      iconElement.innerHTML = "arrow_right"
    }
  }
}