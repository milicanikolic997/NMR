import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerce.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  products: any;

  constructor(private WC: WoocommerceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const cId = paramMap.get('cId');
      console.log('Category Id found: ', cId);
      this.WC.getProductsByCategory(cId).subscribe((data) => {
        this.products =data;
        console.log('Single product by category: ', this.products)
      })
    });
  }

}
