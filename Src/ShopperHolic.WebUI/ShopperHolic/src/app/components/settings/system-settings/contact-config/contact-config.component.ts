import { Component, OnInit } from '@angular/core';
import { ContactPage } from 'src/app/models/content/contactPage';
import { ContentService } from 'src/app/services/generic/content.service';

@Component({
  selector: 'app-contact-config',
  templateUrl: './contact-config.component.html',
  styleUrls: ['./contact-config.component.css']
})
export class ContactConfigComponent {

  constructor(public service: ContentService) { }

  public populateContactTab(config: ContactPage){
    this.service.curContactConfig = config;
  }

  public updateConfig(){
    let sub = this.service.updateContactPage(this.service.curContactConfig).subscribe(() =>{
      sub.unsubscribe();
    });
  }

}
