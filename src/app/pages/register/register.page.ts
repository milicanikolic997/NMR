import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  username: string="";
  email: string="";
  password: string="";
  repassword: string="";

  constructor(private auth: AuthService, private CFS: CommonfunctionService, private platform: Platform) { }

  ngOnInit() {
  }

  signUp(){
    this.platform.ready().then(() => {
      if((this.username !='') && (this.password !='') && (this.repassword !='') && 
      (this.password == this.repassword) && (this.CFS.validateEmail(this.email))) {
        console.log('Username: ', this.username);
        console.log('Email: ', this.email);
        console.log('Password: ', this.password);

        this.auth.registerCustomer(this.email, this.username, this.password).then((response) => {
          if(response['error']){
           this.CFS.presentToast(response['error'].message, true, 'bottom', 2000);
          } else {
            this.CFS.presentToast('Registration successful', true, 'bottom', 2000);
          }
         });
      } else {
        this.CFS.presentToast('Please fill up the forms correctly', true, 'bottom', 2000);
      }
    });

  }

}
