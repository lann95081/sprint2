import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ProductListComponent} from './product-list/product-list.component';
import {AuthGuard} from './security/auth.guard';
import {AdminGuard} from './security/admin.guard';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {CartComponent} from './cart/cart.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'product/list',
    component: ProductListComponent
  },
  {
    canActivate: [AdminGuard],
    path: 'product-detail/:productId',
    component: ProductDetailComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
