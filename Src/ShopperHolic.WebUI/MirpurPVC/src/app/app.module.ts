import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/generic/header/header.component';
import { NavComponent } from './components/generic/nav/nav.component';
import { LoginComponent } from './components/generic/login/login.component';
import { HomeComponent } from './components/generic/home/home.component';
import { AboutComponent } from './components/generic/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './components/generic/contact/contact.component';
import { AdminPanelComponent } from './components/generic/admin-panel/admin-panel.component';
import { AuthGuard } from './services/security/auth.guard';
import { AuthService } from './services/security/auth.service';
import { HttpInterceptorModule } from './services/security/http-interceptor';
import { ProductGroupService} from './services/stock/product-group.service';
import { ProductGroupComponent } from './components/stock/productGroups/product-group/product-group.component';
import { ProductGroupSearchComponent } from './components/stock/productGroups/product-group-search/product-group-search.component';
import { ProductGroupCreateComponent } from './components/stock/productGroups/product-group-create/product-group-create.component';
import { ProductGroupDetailComponent } from './components/stock/productGroups/product-group-detail/product-group-detail.component';
import { ProductGroupGridComponent } from './components/stock/productGroups/product-group-grid/product-group-grid.component';
import { ProductGroupUpdateComponent } from './components/stock/productGroups/product-group-update/product-group-update.component';


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
    ProductGroupUpdateComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpInterceptorModule
  ],
  providers: [AuthService, AuthGuard, ProductGroupService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
