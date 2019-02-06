import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/generic/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public service: ContentService) { }

  ngOnInit() {
    let obs = this.service.getContactPage().subscribe(() =>{
      obs.unsubscribe();
    })
  }

}
