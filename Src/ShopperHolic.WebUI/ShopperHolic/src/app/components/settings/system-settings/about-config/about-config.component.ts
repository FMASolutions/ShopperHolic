import { Component } from '@angular/core';
import { AboutPage } from 'src/app/models/content/aboutPage';
import { ContentService } from 'src/app/services/generic/content.service';

@Component({
  selector: 'app-about-config',
  templateUrl: './about-config.component.html',
  styleUrls: ['./about-config.component.css']
})
export class AboutConfigComponent {

  constructor(public service: ContentService) { }

  public populateAboutTab(config: AboutPage){
    this.service.curAboutConfig = config;
  }

  public updateConfig(){
    let sub = this.service.updateAboutPage(this.service.curAboutConfig).subscribe(() =>{
      sub.unsubscribe();
    });
  }
}
