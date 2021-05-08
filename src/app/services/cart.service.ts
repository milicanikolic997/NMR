import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  quantityUpdatedProducts: any;
  constructor(private storage: Storage) {
    this.ngOnInit();
   }
  public cartItems = new BehaviorSubject(0);

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  updateCart(){
    let newItem = this.cartItems.getValue();
    this.cartItems.next(newItem+1);
  }

  keepCartItemsOnRefresh(){
    let items = 0;
    this.storage.forEach((data) => {
      items+=1;
    }).then(()=>{
      this.cartItems.next(items);
    });
  }

}
