export class CreditNoteItem {
    creditNoteID: number = 0;
    creditNoteItemID: number = 0;
    orderID: number = 0;
    rmaID: number = 0;
    creditDate: Date = new Date();
    itemDescription: string = "";
    creditQty: number = 0;
    itemPrice: number = 0.00;
    creditItemTotal: number = 0.00;
    creditNoteItemStatus: string = "";
    creditNoteStatus: string = "";
    customerName: string = "";
    itemCode: string = "";   
}

