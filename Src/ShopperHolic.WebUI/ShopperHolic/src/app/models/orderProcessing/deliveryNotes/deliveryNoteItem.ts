export class DeliveryNoteItem {
    deliveryNoteItemID: number = 0;
    deliveryNoteID: number = 0;
    orderHeaderID: number = 0;
    deliveryDate: Date = new Date();
    orderItemID: number = 0;
    rmaid: number = 0;
    orderItemDescription: string = "";
    orderItemQty: number = 0;
    customerName: string = "";
    itemCode: string = "";
}