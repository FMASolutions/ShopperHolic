import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentService } from 'src/app/services/generic/content.service';
import { AppConfigComponent } from './app-config/app-config.component';
import { AboutConfigComponent } from './about-config/about-config.component';
import { LandingConfigComponent } from './landing-config/landing-config.component';
import { ContactConfigComponent } from './contact-config/contact-config.component';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.css']
})
export class SystemSettingsComponent implements OnInit {

  @ViewChild(AppConfigComponent) childAppComponent;
  @ViewChild(AboutConfigComponent) childAboutComponent;
  @ViewChild(ContactConfigComponent) childContactComponent;
  @ViewChild(LandingConfigComponent) childLandingComponent;
  constructor(public service: ContentService) { }

  ngOnInit() {
    setTimeout(() => {
      let obs = this.service.getSiteConfig().subscribe(resp => {
        this.childAppComponent.populateAppTab(resp.appConfig);
        this.childAboutComponent.populateAboutTab(resp.aboutPage);
        this.childContactComponent.populateContactTab(resp.contactPage);
        this.childLandingComponent.populateLandingTab(resp.landingPage.pageInfo);
        obs.unsubscribe();
        console.log(resp);
      })
    }, 1);
  }

}
