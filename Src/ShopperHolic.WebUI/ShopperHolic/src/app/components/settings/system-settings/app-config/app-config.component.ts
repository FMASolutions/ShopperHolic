import { Component } from '@angular/core';
import { BasicSiteConfig } from 'src/app/models/content/basicSiteConfig';
import { ContentService } from 'src/app/services/generic/content.service';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.css']
})
export class AppConfigComponent {

  constructor(public service: ContentService) { }

  public populateAppTab(config: BasicSiteConfig) {
    this.service.curAppConfig = config;
  }

  public updateConfig() {
    let sub = this.service.updateSiteConfig(this.service.curAppConfig).subscribe(() => {
      sub.unsubscribe();
    });
  }
}
