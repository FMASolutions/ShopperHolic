import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/security/auth.guard';
import { HomeComponent } from './components/generic/home/home.component';
import { LoginComponent } from './components/generic/login/login.component';
import { AboutComponent } from './components/generic/about/about.component';
import { ContactComponent } from './components/generic/contact/contact.component';
import { ProductGroupsComponent } from './components/stock/product-groups/product-groups.component';
import { SubGroupsComponent } from './components/stock/sub-groups/sub-groups.component';
import { ItemsComponent } from './components/stock/items/items.component';
import { CountriesComponent } from './components/location/countries/countries.component';
import { CitiesComponent } from './components/location/cities/cities.component';
import { CityAreasComponent } from './components/location/city-areas/city-areas.component';
import { AddressesComponent } from './components/location/addresses/addresses.component';
import { CustomersComponent } from './components/accounts/customers/customers.component';
import { SuppliersComponent } from './components/accounts/suppliers/suppliers.component';
import { UserAccountsComponent } from './components/accounts/user-accounts/user-accounts.component';
import { OrdersComponent } from './components/orderProcessing/orders/orders.component';
import { OrderComponent } from './components/orderProcessing/orders/order/order.component';
import { AllDeliveryNotesComponent } from './components/orderProcessing/delivery-notes/all-delivery-notes/all-delivery-notes.component';
import { DeliveryNoteComponent } from './components/orderProcessing/delivery-notes/delivery-note/delivery-note.component';
import { AllInvoicesComponent } from './components/orderProcessing/invoices/all-invoices/all-invoices.component';
import { InvoiceComponent } from './components/orderProcessing/invoices/invoice/invoice.component';
import { SystemSettingsComponent } from './components/settings/system-settings/system-settings.component';
import { RmasComponent } from './components/orderProcessing/rmas/rmas.component';
import { RmaComponent } from './components/orderProcessing/rmas/rma/rma.component';
import { AllReturnNotesComponent } from './components/orderProcessing/return-notes/all-return-notes/all-return-notes.component';
import { ReturnNoteComponent } from './components/orderProcessing/return-notes/return-note/return-note.component';
import { AllCreditNotesComponent } from './components/orderProcessing/credit-notes/all-credit-notes/all-credit-notes.component';
import { CreditNoteComponent } from './components/orderProcessing/credit-notes/credit-note/credit-note.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'productGroups',
    component: ProductGroupsComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'subGroups',
    component: SubGroupsComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'items',
    component: ItemsComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'countries',
    component: CountriesComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'cities',
    component: CitiesComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'cityAreas',
    component: CityAreasComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'addresses',
    component: AddressesComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'users',
    component: UserAccountsComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'deliveryNotes',
    component: AllDeliveryNotesComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'deliveryNote',
    component: DeliveryNoteComponent
  },
  {
    path: 'invoices',
    component: AllInvoicesComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'rmas',
    component: RmasComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'rma',
    component: RmaComponent
  },
  {
    path: 'returnNotes',
    component: AllReturnNotesComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'returnNote',
    component: ReturnNoteComponent
  },
  {
    path: 'creditNotes',
    component: AllCreditNotesComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'creditNote',
    component: CreditNoteComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'systemSettings',
    component: SystemSettingsComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
