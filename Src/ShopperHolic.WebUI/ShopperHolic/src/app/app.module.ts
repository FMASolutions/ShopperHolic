import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './services/generic/http-interceptor';
import { AuthGuard } from './services/security/auth.guard';
import { AuthService } from './services/security/auth.service';
import { LoginComponent } from './components/generic/login/login.component';
import { AuthValidator } from './services/security/auth.validator';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AppComponent } from './app.component';
import { AppNavigationComponent } from './components/generic/app-navigation/app-navigation.component';
import { NotificationComponent } from './components/generic/notification/notification.component';
import { UserActivityComponent } from './components/generic/user-activity/user-activity.component';
import { StatusMessageService } from './services/generic/status-message.service';
import { HomeComponent } from './components/generic/home/home.component';
import { AboutComponent } from './components/generic/about/about.component';
import { ContactComponent } from './components/generic/contact/contact.component';
import { ProductGroupsComponent } from './components/stock/product-groups/product-groups.component';
import { ProductGroupComponent } from './components/stock/product-groups/product-group/product-group.component';
import { ProductGroupListComponent } from './components/stock/product-groups/product-group-list/product-group-list.component';
import { ProductGroupService } from './services/stock/product-group.service';
import { SubGroupsComponent } from './components/stock/sub-groups/sub-groups.component';
import { SubGroupComponent } from './components/stock/sub-groups/sub-group/sub-group.component';
import { SubGroupListComponent } from './components/stock/sub-groups/sub-group-list/sub-group-list.component';
import { SubGroupService } from './services/stock/sub-group.service';
import { LoadingSpinnerComponent } from './components/generic/loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from './services/generic/loading-spinner.service';
import { ProductGroupSelectorComponent } from './components/stock/product-groups/product-group-selector/product-group-selector.component';
import { ItemsComponent } from './components/stock/items/items.component';
import { ItemComponent } from './components/stock/items/item/item.component';
import { ItemListComponent } from './components/stock/items/item-list/item-list.component';
import { ItemSelectorComponent } from './components/stock/items/item-selector/item-selector.component';
import { SubGroupSelectorComponent } from './components/stock/sub-groups/sub-group-selector/sub-group-selector.component';
import { ItemService } from './services/stock/item.service';
import { CountriesComponent } from './components/location/countries/countries.component';
import { CountryComponent } from './components/location/countries/country/country.component';
import { CountryListComponent } from './components/location/countries/country-list/country-list.component';
import { CountrySelectorComponent } from './components/location/countries/country-selector/country-selector.component';
import { CitiesComponent } from './components/location/cities/cities.component';
import { CityComponent } from './components/location/cities/city/city.component';
import { CityListComponent } from './components/location/cities/city-list/city-list.component';
import { CitySelectorComponent } from './components/location/cities/city-selector/city-selector.component';
import { CityAreasComponent } from './components/location/city-areas/city-areas.component';
import { CityAreaComponent } from './components/location/city-areas/city-area/city-area.component';
import { CityAreaListComponent } from './components/location/city-areas/city-area-list/city-area-list.component';
import { CityAreaSelectorComponent } from './components/location/city-areas/city-area-selector/city-area-selector.component';
import { AddressesComponent } from './components/location/addresses/addresses.component';
import { AddressComponent } from './components/location/addresses/address/address.component';
import { AddressListComponent } from './components/location/addresses/address-list/address-list.component';
import { AddressSelectorComponent } from './components/location/addresses/address-selector/address-selector.component';
import { CountryService } from './services/location/country.service';
import { CityService } from './services/location/city.service';
import { CityAreaService } from './services/location/city-area.service';
import { AddressService } from './services/location/address.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    NotificationComponent,
    UserActivityComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    ProductGroupsComponent,
    ProductGroupComponent,
    ProductGroupListComponent,
    ProductGroupSelectorComponent,
    SubGroupsComponent,
    SubGroupComponent,
    SubGroupListComponent,
    SubGroupSelectorComponent,
    ItemsComponent,
    ItemComponent,
    ItemListComponent,
    ItemSelectorComponent,
    CountriesComponent,
    CountryComponent,
    CountryListComponent,
    CountrySelectorComponent,
    CitiesComponent,
    CityComponent,
    CityListComponent,
    CitySelectorComponent,
    CityAreasComponent,
    CityAreaComponent,
    CityAreaListComponent,
    CityAreaSelectorComponent,
    AddressesComponent,
    AddressComponent,
    AddressListComponent,
    AddressSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpInterceptorModule,
    FlexLayoutModule,
    LayoutModule,

  ],
  providers: [
    AuthGuard,
    CookieService,
    AuthService,
    AuthValidator,
    LoadingSpinnerService,
    StatusMessageService,
    ProductGroupService,
    SubGroupService,
    ItemService,
    CountryService,
    CityService,
    CityAreaService,
    AddressService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserActivityComponent,
    LoadingSpinnerComponent,
    ProductGroupComponent,
    ProductGroupSelectorComponent,
    SubGroupComponent,
    SubGroupSelectorComponent,
    ItemComponent,
    ItemSelectorComponent,
    CountryComponent,
    CountrySelectorComponent,
    CityComponent,
    CitySelectorComponent,
    CityAreaComponent,
    CityAreaSelectorComponent,
    AddressComponent,
    AddressSelectorComponent
  ]
})
export class AppModule { }
