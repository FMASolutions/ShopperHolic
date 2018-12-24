import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './services/security/http-interceptor';
import { AuthGuard } from './services/security/auth.guard';
import { AuthService } from './services/security/auth.service';
import { AuthValidator } from './services/security/auth.validator';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './components/generic/header/header.component';
import { NavComponent } from './components/generic/nav/nav.component';
import { LoginComponent } from './components/generic/login/login.component';
import { HomeComponent } from './components/generic/home/home.component';
import { AboutComponent } from './components/generic/about/about.component';
import { ContactComponent } from './components/generic/contact/contact.component';
import { AdminPanelComponent } from './components/generic/admin-panel/admin-panel.component';
import { StatusMessageService } from './services/status-message.service';
import { ProductGroupService } from './services/stock/product-group.service';
import { ProductGroupComponent } from './components/stock/productGroups/product-group/product-group.component';
import { ProductGroupSearchComponent } from './components/stock/productGroups/product-group-search/product-group-search.component';
import { ProductGroupCreateComponent } from './components/stock/productGroups/product-group-create/product-group-create.component';
import { ProductGroupDetailComponent } from './components/stock/productGroups/product-group-detail/product-group-detail.component';
import { ProductGroupGridComponent } from './components/stock/productGroups/product-group-grid/product-group-grid.component';
import { ProductGroupUpdateComponent } from './components/stock/productGroups/product-group-update/product-group-update.component';
import { ProductGroupValidator } from './services/stock//product-group-validator';
import { SubGroupService } from './services/stock/sub-group.service';
import { SubGroupValidator } from './services/stock/sub-group-validator';
import { SubGroupComponent } from './components//stock/subGroups/sub-group/sub-group.component';
import { SubGroupCreateComponent } from './components/stock/subGroups/sub-group-create/sub-group-create.component';
import { SubGroupDetailComponent } from './components/stock/subGroups/sub-group-detail/sub-group-detail.component';
import { SubGroupGridComponent } from './components/stock/subGroups/sub-group-grid/sub-group-grid.component';
import { SubGroupSearchComponent } from './components/stock/subGroups/sub-group-search/sub-group-search.component';
import { SubGroupUpdateComponent } from './components/stock/subGroups/sub-group-update/sub-group-update.component';
import { ProductGroupCRUDComponent } from './components/stock/productGroups/product-group-crud/product-group-crud.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    AdminPanelComponent,
    ProductGroupComponent,
    ProductGroupSearchComponent,
    ProductGroupCreateComponent,
    ProductGroupDetailComponent,
    ProductGroupGridComponent,
    ProductGroupUpdateComponent,
    SubGroupComponent,
    SubGroupCreateComponent,
    SubGroupDetailComponent,
    SubGroupGridComponent,
    SubGroupSearchComponent,
    SubGroupUpdateComponent,
    ProductGroupCRUDComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpInterceptorModule
  ],
  providers: [
    AuthGuard,
    CookieService,
    AuthService,
    AuthValidator,
    StatusMessageService,
    ProductGroupService,
    ProductGroupValidator,
    SubGroupValidator,
    SubGroupService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
