import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  customerData: any;
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private CFS: CommonfunctionService, private platform: Platform, private router: Router) {
    let isUserLoggedIn = localStorage.getItem('currentUserId');
    if (isUserLoggedIn) {
      this.router.navigateByUrl('/products');
    }
  }

  ngOnInit() {
  }

  signIn() {
    this.platform.ready().then(() => {
      if ((this.password != '') && (this.CFS.validateEmail(this.email))) {
        console.log('Email: ', this.email);
        console.log('Password: ', this.password);

        this.auth.loginCustomer(this.email, this.password).then((response) => {
          if (response['token']) {
            console.log('Return token: ', response['token']);
            console.log('Returned email: ', response['user_email']);
            this.auth.getUserData(this.email).subscribe((userData) => {
              this.customerData = userData;
              console.log('Customer data: ', this.customerData);
              let currentUserId = this.customerData[0].id;
              localStorage.setItem('currentUserId', currentUserId);

            });
            this.router.navigateByUrl('/categories');

          } else {
            this.CFS.presentToast('There is problem with login', true, 'bottom', 2000);
          }
        });
      } else {
        this.CFS.presentToast('Please fill up the forms correctly', true, 'bottom', 2000);
      }
    });
  }

}
