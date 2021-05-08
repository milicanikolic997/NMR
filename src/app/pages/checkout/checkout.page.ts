import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { Storage } from '@ionic/storage-angular';
import { CartService } from 'src/app/services/cart.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  paymentGatewayTitle: any;
  paymentGatewayId: any;
  isPaymentGatewaySelected: boolean=false;
  baseProducts: any = [];
  allPaymentGateways: any;
  cartData: any = [];
  totalPrice: number = 0;
  billing_first_name = '';
  billing_last_name = '';
  billing_address_1 = '';
  billing_address_2 = '';
  billing_country = '';
  billing_city = '';
  billing_state = '';
  billing_postcode = '';
  billing_phone = '';

  address = {
    first_name: "John",
    last_name: "Doe",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US",
    phone: "(555) 555-5555"
  }

  constructor(private WC: WoocommerceService, private storage: Storage, private cartService: CartService, private platform: Platform, private router: Router) {


  }

  ngOnInit() {
    this.WC.getAllPaymentGateWays().then((gateways) => {
      this.allPaymentGateways = gateways;
      console.log('All payment gateways', this.allPaymentGateways);
    });

    if (this.cartService.quantityUpdatedProducts) {
      this.cartService.quantityUpdatedProducts.forEach((updatededProducts) => {
        let newCartData = {};

        newCartData['product_id'] = updatededProducts.product_id;
        newCartData['price'] = parseInt(updatededProducts.price);
        newCartData['quantity'] = updatededProducts.quantity;
        this.baseProducts.push(newCartData);
        console.log('Product stored in Ionic Storage after quantity: ', this.baseProducts);
      });
    } else {
      this.storage.forEach((data) => {
        let storedProducts = {};
        let parseFromStorage = JSON.parse(data);
        this.cartData.push(parseFromStorage);
        storedProducts['product_id'] = parseFromStorage.id;
        storedProducts['price'] = parseInt(parseFromStorage.price);
        storedProducts['quantity'] = 1;
        this.baseProducts.push(storedProducts);
      }).then(() => {
        console.log('Product stored in Ionic Storage: ', this.baseProducts);
      });

    }
    
  }

  totalCheckoutAmount() {
    this.totalPrice = 0;
    let tempPrice = 0;

    this.baseProducts.forEach((product) => {
      tempPrice = product.price * product.quantity;
      this.totalPrice += tempPrice;
    });
    return this.totalPrice;
  }

  choosePaymnetGateway(gateway){
    this.isPaymentGatewaySelected = true;
    this.paymentGatewayId = gateway.id;
    this.paymentGatewayTitle = gateway.title;
    console.log('Gateway ID', this.paymentGatewayId);
    console.log('Gateway Title', this.paymentGatewayTitle);
  }

  completePurchase(){
    let currentCustomerId = localStorage.getItem('currentUserId');
    let orderObj = {};
    orderObj['payment_method'] = this.paymentGatewayId;
    orderObj['payment_method_title'] = this.paymentGatewayTitle;
    orderObj['customer_id'] = currentCustomerId;
    this.platform.ready().then(() => {
      this.address = {
        first_name: this.billing_first_name,
        last_name: this.billing_last_name,
        address_1: this.billing_address_1,
        address_2: this.billing_address_2,
        city: this.billing_city,
        state: this.billing_state,
        postcode: this.billing_postcode,
        country: this.billing_country,
        phone: this.billing_phone
      }
      orderObj['billing'] = this.address;
      orderObj['shipping'] = this.address;
      orderObj['line_items'] = this.baseProducts;
      this.WC.placeOrder(orderObj).then((respData) => {
        this.storage.clear();
        this.storage.set('currentOrderData', respData);
        this.router.navigateByUrl('/ordersuccess');
      }).catch((error) => {
        console.log('Problem with placing order', error);
      });
    });
  }

}
