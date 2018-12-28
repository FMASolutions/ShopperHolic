import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './services/security/http-interceptor';
import { AuthGuard } from './services/security/auth.guard';
import { AuthService } from './services/security/auth.service';
import { AuthValidator } from './services/security/auth.validator';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/generic/about/about.component';
import { ContactComponent } from './components/generic/contact/contact.component';
import { HomeComponent } from './components/generic/home/home.component';
import { LoginComponent } from './components/generic/login/login.component';
import { StatusMessageService } from './services/status-message.service';
import { ProductGroupService } from './services/stock/productGroup/product-group.service';
import { ProductGroupsComponent } from './components/stock/product-groups/product-groups.component';
import { ProductGroupComponent } from './components/stock/product-groups/product-group/product-group.component';
import { ProductGroupListComponent } from './components/stock/product-groups/product-group-list/product-group-list.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NotificationComponent } from './components/generic/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductGroupsComponent,
    ProductGroupComponent,
    ProductGroupListComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    AppNavigationComponent,
    NotificationComponent,
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
    StatusMessageService,
    ProductGroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
