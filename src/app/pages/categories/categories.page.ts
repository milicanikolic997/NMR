import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: any;

  constructor(private WC: WoocommerceService) { }

  ngOnInit() {
    this.WC.getAllCategories().subscribe((data) =>{
      this.categories = data;
      console.log('All categories:', this.categories);
    })
  }


}
