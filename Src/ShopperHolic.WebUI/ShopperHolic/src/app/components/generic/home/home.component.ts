import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentService } from 'src/app/services/generic/content.service';
import { ItemDetailed } from 'src/app/models/stock/items/itemDetailed';
import { LandingPage } from 'src/app/models/content/landingPage';
import { Globals } from 'src/globals';
import { FeaturedItemsComponent } from '../../stock/items/featured-items/featured-items.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: ContentService) { }

  @ViewChild(FeaturedItemsComponent) childFeaturedItemComponent;

  pageTitle: string = "";
  pageDescription: string = "";

  ngOnInit() {
    setTimeout(() => {
      let obs = this.service.getLandingPage().subscribe(resp => {
        this.populatePageInfo(resp.pageInfo);
        this.childFeaturedItemComponent.refreshItems(resp.featuredItems);
        obs.unsubscribe();
      });
    }, 1);
  }

  private populatePageInfo(pageInfo: LandingPage) {
    this.pageTitle = pageInfo.pageTitle;
    this.pageDescription = pageInfo.pageDescription;
  }

}
