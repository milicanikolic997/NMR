import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: any;
  constructor(private WC: WoocommerceService) { }

  ngOnInit() {
    this.WC.getAllStoreProducts().subscribe((data) => {
      this.products = data;
      console.log('All products from Store', this.products);
    });
  }

}
