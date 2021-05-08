import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: boolean= false;
  customerData: any;
  apiURL: string = '';
  siteURL: string='https://nmr-prodavnica.local/';
  woocomPart: string='/wp-json/wc/v3/';
  jwtPart: string='/wp-json/jwt-auth/v1/token';
  consumerKey: string='ck_c808f50d3036e22963103cca38813a0ef5686076';
  consumerSecret: string='cs_4b06755d38e778aa60c94f7e616089aae7549806';

  constructor(private http: HttpClient, private router: Router) { }

  registerCustomer(email, username, password) {
    let headers = new HttpHeaders (
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      let credentials = `username=${username}&email=${email}&password=${password}`;
      this.apiURL = `${this.siteURL}${this.woocomPart}customers?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
      console.log('API URL for register a customer: ', this.apiURL);

      return new Promise ((resolve) => {
        this.http.post(this.apiURL, credentials, {headers}).subscribe((successResp) => {
          resolve(successResp);
        },
        (errorResp) => {
          resolve(errorResp);
        }
        )
      });

  }

  loginCustomer(email, password) {
    let headers = new HttpHeaders (
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      let credentials = `username=${email}&password=${password}`;
      this.apiURL = `${this.siteURL}${this.jwtPart}`;
      console.log('API URL for login a customer: ', this.apiURL);

      return new Promise ((resolve) => {
        this.http.post(this.apiURL, credentials, {headers}).subscribe((successResp) => {
          resolve(successResp);
          this.isUserLoggedIn = true;
        },
        (errorResp) => {
          resolve(errorResp);
        }
        )
      });

  }

  getUserData(email) {
    this.apiURL = `${this.siteURL}${this.woocomPart}customers?email=${email}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    console.log('API url for retrive customer: ', this.apiURL);
    this.customerData = this.http.get(this.apiURL);
    return this.customerData;
  }

  customerLogOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  get isUserAuthenticated () {
    let currentUserId = localStorage.getItem('currentUserId');
    if(currentUserId){
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
    return this.isUserLoggedIn;
  }



}
