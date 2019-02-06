import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/generic/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public service: ContentService) { }

  ngOnInit() {
    let obs = this.service.getAboutPage().subscribe(() =>{
      obs.unsubscribe();
    })
  }
}
