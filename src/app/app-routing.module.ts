import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'products',
    children:[
      {
        path:'',
        loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path:':pId',
        loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
      }
    ]
    
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'categories',
    children:[
      {
        path:'',
        loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path:':cId',
        loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
      }
    ]
    
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'ordersuccess',
    loadChildren: () => import('./pages/ordersuccess/ordersuccess.module').then( m => m.OrdersuccessPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
