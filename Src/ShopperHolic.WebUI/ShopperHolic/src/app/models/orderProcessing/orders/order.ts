export class Order {
    orderID: number = 0;
    customerID: number = 0;
    addressID: number = 0;
    orderStatusID: number = 0;
    orderDate: Date = new Date();
    deliveryDate: Date = new Date();
    addressLine1: string = "";
    addressLine2: string = "";
    cityAreaName: string = "";
    cityName: string = "";
    postCode: string = "";
    countryName: string = "";
    customerName: string = "";
    orderStatusText: string = "";
}