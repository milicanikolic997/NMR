import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Products', url: '/products', icon: 'pricetag' },
    { title: 'Categories', url: '/categories', icon: 'grid' },
    { title: 'Cart', url: '/cart', icon: 'cart' },
    { title: 'Checkout', url: '/checkout', icon: 'basket' },
    { title: 'Login', url: '/login', icon: 'add' },
    { title: 'Register', url: '/register', icon: 'person-add' },
  ];
  
  constructor() {}
}
