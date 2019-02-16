import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  constructor(private router: Router) { 

  }

  public goToDeliveryNotePage(id: number){
    this.router.navigateByUrl('/deliveryNote?id=' + id.toString());
  }

  public goToOrderPage(id: number) {
    this.router.navigateByUrl('/order?id=' + id.toString());
  }

  public goToInvoicePage(id: number){
    this.router.navigateByUrl('/invoice?id=' + id.toString());
  }

  public goToReturnNotePage(id: number){
    this.router.navigateByUrl('/returnNote?id=' + id.toString());
  }

  public goToCreditNotePage(id: number){
    this.router.navigateByUrl('/creditNote?id=' + id.toString());
  }

  public goToRMAPage(id: number){
    this.router.navigateByUrl('/rma?id=' + id.toString());
  }
}
