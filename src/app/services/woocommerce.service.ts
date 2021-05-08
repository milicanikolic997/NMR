import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {

  orderResp: any;
  products: any;
  product: any;
  categories: any;
  paymentGateways: any;
  apiURL: string = '';
  siteURL: string = 'https://nmr-prodavnica.local/';
  woocomPart: string = '/wp-json/wc/v3/';
  consumerKey: string = 'ck_c808f50d3036e22963103cca38813a0ef5686076';
  consumerSecret: string = 'cs_4b06755d38e778aa60c94f7e616089aae7549806';

  constructor(private http: HttpClient) { }

  getAllStoreProducts() {
    this.apiURL = `${this.siteURL}${this.woocomPart}products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    console.log('API URL for all store products: ', this.apiURL);
    this.products = this.http.get(this.apiURL);
    return this.products;
  }

  getSingleProduct(pId) {
    this.apiURL = `${this.siteURL}${this.woocomPart}products/${pId}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    console.log('API URL for single product: ', this.apiURL);
    this.products = this.http.get(this.apiURL);
    return this.products;

  }

  getAllCategories() {
    this.apiURL = `${this.siteURL}${this.woocomPart}products/categories?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    console.log('API URL for all categories: ', this.apiURL);
    this.categories = this.http.get(this.apiURL);
    return this.categories;
  }

  getProductsByCategory(cId) {
    this.apiURL = `${this.siteURL}${this.woocomPart}products?category=${cId}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    console.log('API URL for products of a category: ', this.apiURL);
    this.product = this.http.get(this.apiURL);
    return this.product;
  }

  getAllPaymentGateWays() {
    this.apiURL = `${this.siteURL}${this.woocomPart}payment_gateways?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    console.log('API URL for all payment getaways', this.apiURL);
    return new Promise((resolve) => {
      this.paymentGateways = this.http.get(this.apiURL);
      this.paymentGateways.subscribe((data) => {
        resolve(data);
      });
    })


  }
  // convert javascript object to x-www-form-urlencoded format
  JSON_to_URLEncoded(element, key?, list?) {
    var list = list || [];
    if (typeof element == "object") {
      for (var idx in element)
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + "[" + idx + "]" : idx,
          list
        );
    } else {
      list.push(key + "=" + encodeURIComponent(element));
    }
    return list.join("&");
  }

  placeOrder(orderDataObj) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let orderData = this.JSON_to_URLEncoded(orderDataObj);

    this.apiURL = `${this.siteURL}${this.woocomPart}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    console.log('API URL for order: ', this.apiURL);

    return new Promise((resolve) => {
      this.orderResp = this.http.post(this.apiURL, orderData, { headers });
      this.orderResp.subscribe((responseData) => {
        resolve(responseData);
      });
    });

  }
}
