import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { Storage } from '@ionic/storage-angular';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  cartItems: number=0;
  product: any;
  constructor(private WC: WoocommerceService, private activatedRoute: ActivatedRoute, 
    private storage: Storage, private CFS: CommonfunctionService, private cartService: CartService) {
      this.storage.remove('currentOrderData');

      this.cartService.keepCartItemsOnRefresh();
     }

 ngOnInit() {

    this.cartService.cartItems.subscribe((value) =>{
      this.cartItems = value;
    })

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const pId = paramMap.get('pId');
      console.log('Product Id found: ', pId);
      this.WC.getSingleProduct(pId).subscribe((data) => {
        this.product =data;
        console.log('Single product: ', this.product)
      })
    });
  }
 
  addToCart(){
    this.storage.get(`product_${this.product.id}`).then( data => {
      if(data){
        this.CFS.presentToast('Item already in cart!', true, 'bottom', 2000);
      } else {
        this.CFS.presentToast('Item added to cart!', true, 'bottom', 2000);
        this.storage.set(`product_${this.product.id}`, JSON.stringify(this.product)).then(() =>{
        this.cartService.updateCart();
        });
      }
    });
    console.log('Add to cart button clicked');
  }


}
