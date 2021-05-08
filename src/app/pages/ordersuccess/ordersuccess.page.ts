import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.page.html',
  styleUrls: ['./ordersuccess.page.scss'],
})
export class OrdersuccessPage implements OnInit {

  isOrderSuccessful: boolean = false;
  currentOrderData: any;
  constructor(private storage: Storage) { }

  ngOnInit() {

    this.storage.get('currentOrderData').then((data) =>{
      this.currentOrderData = data;
      console.log('Current order: ', this.currentOrderData);

      if(this.currentOrderData){
        this.isOrderSuccessful=true;
      }

    });

  }

}
