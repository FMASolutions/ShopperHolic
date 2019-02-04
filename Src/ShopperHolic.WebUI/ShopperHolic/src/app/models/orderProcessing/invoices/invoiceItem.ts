export class InvoiceItem {
    invoiceID: number = 0;
    invoiceItemID: number = 0;
    orderID: number = 0;
    invoiceDate: Date = new Date();
    itemDescription: string = "";
    itemQty: number = 0;
    itemPrice: number = 0;
    itemTotal: number = 0;
    invoiceItemStatus: string = "";
    customerName: string = "";
}