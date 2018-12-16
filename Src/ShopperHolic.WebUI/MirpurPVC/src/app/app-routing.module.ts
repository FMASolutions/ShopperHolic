import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/generic/home/home.component';
import { LoginComponent } from './components/generic/login/login.component';
import { AboutComponent } from './components/generic/about/about.component';
import { ContactComponent } from './components/generic/contact/contact.component';
import { AdminPanelComponent } from './components/generic/admin-panel/admin-panel.component';
import { AuthGuard } from './services/security/auth.guard';
import { ProductGroupComponent } from './components/stock/productGroups/product-group/product-group.component';
import { ProductGroupCreateComponent } from './components/stock/productGroups/product-group-create/product-group-create.component';
import { ProductGroupSearchComponent } from './components/stock/productGroups/product-group-search/product-group-search.component';
import { ProductGroupDetailComponent } from './components/stock/productGroups/product-group-detail/product-group-detail.component';
import { ProductGroupGridComponent } from './components/stock/productGroups/product-group-grid/product-group-grid.component';
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
    path: 'adminPanel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'IsAdminUser' }
  },
  {
    path: 'ProductGroups',
    component: ProductGroupComponent
  },
  {
    path: 'ProductGroupSearch',
    component: ProductGroupSearchComponent
  },
  {
    path: 'ProductGroupCreate',
    component: ProductGroupCreateComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'UserCanCreateProductGroup'}
  },
  {
    path: 'ProductGroupDetail',
    component: ProductGroupDetailComponent
  },
  {
    path: 'ProductGroupGrid',
    component: ProductGroupGridComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
