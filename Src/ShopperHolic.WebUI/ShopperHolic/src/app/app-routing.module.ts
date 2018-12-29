import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/security/auth.guard';
import { HomeComponent } from './components/generic/home/home.component';
import { LoginComponent } from './components/generic/login/login.component';
import { AboutComponent } from './components/generic/about/about.component';
import { ContactComponent } from './components/generic/contact/contact.component';
import { ProductGroupsComponent } from './components/stock/product-groups/product-groups.component';
import { SubGroupsComponent } from './components/stock/sub-groups/sub-groups.component';

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
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
