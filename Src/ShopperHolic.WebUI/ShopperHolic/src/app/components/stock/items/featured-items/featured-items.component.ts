import { Component, OnInit } from '@angular/core';
import { ItemDetailed } from 'src/app/models/stock/items/itemDetailed';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-featured-items',
  templateUrl: './featured-items.component.html',
  styleUrls: ['./featured-items.component.css']
})
export class FeaturedItemsComponent implements OnInit {

  constructor() { }

  featuredItemList: ItemDetailed[] = [];
  productGroups: Prod[] = [];
  subGroups: Sub[] = [];
  imageLocationPrefix: string = Globals.APP_SETTINGS.BASE_API_URL + "/uploads/";

  ngOnInit() {
  }

  refreshItems(featuredItemList: ItemDetailed[]){
    this.populateStock(featuredItemList);
  }

  
  private populateStock(featuredItems: ItemDetailed[]) {
    this.featuredItemList = featuredItems;
    featuredItems.forEach(currentItem => {

      //Add Product Group to array if it isn't already present
      if (this.productGroups.findIndex(p => p.prodID == currentItem.productGroupID) < 0) {
        this.productGroups.push({ //Add Product Group to array
          prodID: currentItem.productGroupID,
          prodCode: currentItem.productGroupCode,
          prodName: currentItem.productGroupName,
          prodDesc: currentItem.productGroupDescription
        });
      }


      let subSearchIndex = this.subGroups.findIndex(s => s.subID == currentItem.subGroupID)
      if (subSearchIndex < 0) {

        let newSubGroup: Sub = new Sub();
        let newCardRow: CardRow = new CardRow();
        let newCard: Card = new Card();
        newCard.itemInfo.itemCode = currentItem.itemCode;
        newCard.itemInfo.itemID = currentItem.itemID;
        newCard.itemInfo.itemDesc = currentItem.itemDescription;
        newCard.itemInfo.itemName = currentItem.itemName;
        newCard.itemInfo.imgSrc = this.imageLocationPrefix + currentItem.itemImageFilename;
        newCard.itemInfo.itemPrice = currentItem.itemUnitPrice;
        newCardRow.cards.push(newCard);
        
        newSubGroup.cardRows.rows.push(newCardRow);

        newSubGroup.prodID = currentItem.productGroupID;
        newSubGroup.subID = currentItem.subGroupID;
        newSubGroup.subCode = currentItem.subGroupCode;
        newSubGroup.subName = currentItem.subGroupName;
        newSubGroup.subDesc = currentItem.subGroupDescription;
        this.subGroups.push(newSubGroup);
      }
      else {
        let currentSubGroup = this.subGroups[subSearchIndex];
        let lastRowIndex = currentSubGroup.cardRows.rows.length - 1;
        let lastRow = currentSubGroup.cardRows.rows[lastRowIndex];
        if (lastRow.cards.length > 2) { // No more than 3 cards per row allowed, new row required
          let newCardRow: CardRow = new CardRow();
          let newCard: Card = new Card();
          newCard.itemInfo.itemCode = currentItem.itemCode;
          newCard.itemInfo.itemID = currentItem.itemID;
          newCard.itemInfo.itemDesc = currentItem.itemDescription;
          newCard.itemInfo.itemName = currentItem.itemName;
          newCard.itemInfo.imgSrc = this.imageLocationPrefix + currentItem.itemImageFilename;
          newCard.itemInfo.itemPrice = currentItem.itemUnitPrice;
          newCardRow.cards.push(newCard);
          currentSubGroup.cardRows.rows.push(newCardRow);
        }
        else { //Add card to current row
          let newCard: Card = new Card();
          newCard.itemInfo.itemCode = currentItem.itemCode;
          newCard.itemInfo.itemID = currentItem.itemID;
          newCard.itemInfo.itemDesc = currentItem.itemDescription;
          newCard.itemInfo.itemName = currentItem.itemName;
          newCard.itemInfo.imgSrc = this.imageLocationPrefix + currentItem.itemImageFilename;
          newCard.itemInfo.itemPrice = currentItem.itemUnitPrice;
          currentSubGroup.cardRows.rows[lastRowIndex].cards.push(newCard);
        }
      }
    });
  }

}


class Itm {
  itemID: number = 0;
  itemCode: string = "";
  itemName: string = "";
  itemDesc: string = "";
  imgSrc: string = "";
  itemPrice: number = 0;
  titleStyle: string = "";
}
class Card {
  itemInfo: Itm = new Itm();
}
class CardRows {
  rows: CardRow[] = [];
}
class CardRow {
  cards: Card[] = [];
}

class Sub {
  cardRows: CardRows = new CardRows();
  subID: number = 0;
  prodID: number = 0;
  subCode: string = "";
  subName: string = "";
  subDesc: string = "";
}
class Prod {
  prodID: number = 0;
  prodCode: string = "";
  prodName: string = "";
  prodDesc: string = "";
}