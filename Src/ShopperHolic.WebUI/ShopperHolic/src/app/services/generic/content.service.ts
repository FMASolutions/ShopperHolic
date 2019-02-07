import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from './user-notification.service';
import { AboutPage } from 'src/app/models/content/aboutPage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContactPage } from 'src/app/models/content/contactPage';
import { LandingPageWithItems } from 'src/app/models/content/landingPageWithItems';
import { BasicSiteConfig } from 'src/app/models/content/basicSiteConfig';
import { LandingPage } from 'src/app/models/content/landingPage';
import { SiteConfig } from 'src/app/models/content/siteConfig';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Content/';
  curAboutConfig: AboutPage;
  curContactConfig: ContactPage;
  curAppConfig: BasicSiteConfig = new BasicSiteConfig();
  curLandingConfig: LandingPage;
  curLandingWithItemsConfig: LandingPageWithItems;

  constructor(private http: HttpClient, private userNotificationService: UserNotificationService) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public getAboutPage(): Observable<AboutPage> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<AboutPage>(this.baseURL + 'GetAboutPage').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
      this.curAboutConfig = resp;
    }, err => {
      this.userNotificationService.informUserError(Globals.CONTENT_READ_FAILED + err.error);
      this.userNotificationService.informUserError(err.error);

    }));;
  }

  public getContactPage(): Observable<ContactPage> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ContactPage>(this.baseURL + 'GetContactPage').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
      this.curContactConfig = resp;
    }, err => {
      this.userNotificationService.informUserError(Globals.CONTENT_READ_FAILED + err.error);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getLandingPage(): Observable<LandingPageWithItems> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.CONTENT_READ_ATTEMPT);
    return this.http.get<LandingPageWithItems>(this.baseURL + 'GetLandingPage').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
      this.curLandingWithItemsConfig = resp;
      this.curLandingConfig = resp.pageInfo;
    }, err => {
      this.userNotificationService.informUserError(Globals.CONTENT_READ_FAILED + err.error);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getSiteConfig(): Observable<SiteConfig> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<SiteConfig>(this.baseURL + 'GetSiteConfig').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
      this.curAboutConfig = resp.aboutPage;
      this.curAppConfig = resp.appConfig;
      this.curContactConfig = resp.contactPage;
      this.curLandingWithItemsConfig = resp.landingPage;
      this.curLandingConfig = resp.landingPage.pageInfo;
    }, err => {
      this.userNotificationService.informUserError(Globals.CONTENT_READ_FAILED + err.error);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public updateAboutPage(newModel: AboutPage): Observable<AboutPage> {
    this.userNotificationService.informUserStart(Globals.CONTENT_UPDATE_ABOUT_ATTEMPT, Globals.CONTENT_UPDATE_ABOUT_ATTEMPT);
    return this.http.put<AboutPage>(this.baseURL + 'UpdateAboutPage', newModel).pipe(tap(resp => {
      this.curAboutConfig = resp;
      this.userNotificationService.informUserComplete(Globals.CONTENT_UPDATE_ABOUT_SUCCESS);
    }, err => {
      this.userNotificationService.informUserError(Globals.CONTENT_UPDATE_ABOUT_FAILED);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public updateContactPage(newModel: ContactPage): Observable<ContactPage> {
    this.userNotificationService.informUserStart(Globals.CONTENT_UPDATE_CONTACT_ATTEMPT, Globals.CONTENT_UPDATE_CONTACT_ATTEMPT);
    return this.http.put<ContactPage>(this.baseURL + 'UpdateContactPage', newModel).pipe(tap(resp => {
      this.curContactConfig = resp;
      this.userNotificationService.informUserComplete(Globals.CONTENT_UPDATE_CONTACT_SUCCESS);
    }, err => {
      this.userNotificationService.informUserError(Globals.CONTENT_UPDATE_CONTACT_FAILED);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public updateLandingPage(newModel: LandingPage): Observable<LandingPage> {
    this.userNotificationService.informUserStart(Globals.CONTENT_UPDATE_LANDING_ATTEMPT, Globals.CONTENT_UPDATE_LANDING_ATTEMPT);
    return this.http.put<LandingPage>(this.baseURL + 'UpdateLandingPage', newModel).pipe(tap(resp => {
      this.curLandingConfig = resp;
      this.userNotificationService.informUserComplete(Globals.CONTENT_UPDATE_LANDING_SUCCESS);
    }, err => {
      this.userNotificationService.informUserError(Globals.CONTENT_UPDATE_LANDING_FAILED);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public updateSiteConfig(newModel: BasicSiteConfig): Observable<BasicSiteConfig> {
    this.userNotificationService.informUserStart(Globals.CONTENT_UPDATE_SITE_CONFIG_ATTEMPT, Globals.CONTENT_UPDATE_SITE_CONFIG_ATTEMPT);
    return this.http.put<BasicSiteConfig>(this.baseURL + 'UpdateSiteConfig', newModel).pipe(tap(resp => {
      this.curAppConfig = resp;
      this.userNotificationService.informUserComplete(Globals.CONTENT_UPDATE_SITE_CONFIG_SUCCESS);
    }, err => {
      this.userNotificationService.informUserError(Globals.CONTENT_UPDATE_SITE_CONFIG_FAILED);
      this.userNotificationService.informUserError(err.error);
    }));
  }
}
