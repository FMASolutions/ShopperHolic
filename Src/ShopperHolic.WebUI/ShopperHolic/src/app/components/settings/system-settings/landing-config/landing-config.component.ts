import { Component, OnInit } from '@angular/core';
import { LandingPage } from 'src/app/models/content/landingPage';
import { ContentService } from 'src/app/services/generic/content.service';

@Component({
  selector: 'app-landing-config',
  templateUrl: './landing-config.component.html',
  styleUrls: ['./landing-config.component.css']
})
export class LandingConfigComponent implements OnInit {

  constructor(public service: ContentService) { }

  ngOnInit() {
  }

  public populateLandingTab(config: LandingPage){
    this.service.curLandingConfig = config;
  }
  public updateConfig(){
    let sub = this.service.updateLandingPage(this.service.curLandingConfig).subscribe(() =>{
      sub.unsubscribe();
    });
  }

}
