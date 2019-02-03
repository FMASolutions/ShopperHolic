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
}
