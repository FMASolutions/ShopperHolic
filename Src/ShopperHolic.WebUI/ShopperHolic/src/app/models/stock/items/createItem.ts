export class CreateItem {
     itemCode: string = ""; 
     subGroupID: number = 0;
     itemName: string = "";
     itemDescription: string = "";
     itemUnitPrice: number = 0.00;
     itemUnitPriceWithMaxDiscount: number = 0.00;
     itemAvailableQty: number = 0;
     itemReorderQtyReminder: number = 0;
     isFeaturedItem: boolean = false;
}