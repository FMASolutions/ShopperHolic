import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { ProductGroupService } from './services/stock/productGroup/product-group.service';
import { SubGroupsComponent } from './components/stock/sub-groups/sub-groups.component';
import { SubGroupComponent } from './components/stock/sub-groups/sub-group/sub-group.component';
import { SubGroupListComponent } from './components/stock/sub-groups/sub-group-list/sub-group-list.component';
import { SubGroupService} from './services/stock/subGroup/sub-group.service';
import { LoadingSpinnerComponent } from './components/generic/loading-spinner/loading-spinner.component';
import { LoadingSpinnerService} from './services/generic/loading-spinner.service';
import { ProductGroupSelectorComponent } from './components/stock/product-groups/product-group-selector/product-group-selector.component';
import { ItemsComponent } from './components/stock/items/items.component';
import { ItemComponent } from './components/stock/items/item/item.component';
import { ItemListComponent } from './components/stock/items/item-list/item-list.component';
import { ItemSelectorComponent } from './components/stock/items/item-selector/item-selector.component';
import { SubGroupSelectorComponent } from './components/stock/sub-groups/sub-group-selector/sub-group-selector.component';
import { ItemService } from './services/stock/item/item.service';

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
  ],
  bootstrap: [AppComponent],
  entryComponents: [ UserActivityComponent,LoadingSpinnerComponent, ProductGroupComponent, ProductGroupSelectorComponent, SubGroupComponent, SubGroupSelectorComponent, ItemComponent, ItemSelectorComponent ]
})
export class AppModule { }
