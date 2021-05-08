import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private alertCtrl: AlertController) {

  }

  canActivate(
    router,
    state: RouterStateSnapshot) {

      if(!this.auth.isUserAuthenticated){
        this.presentAlert();
        this.router.navigateByUrl('/login');
        return false;
      } else {
        return true;
      }

    
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      header: 'Ooops!',
      subHeader: 'You have to login first to view page!',
      buttons: ['Dismiss']
    }).then((alert) => {
      alert.present();
    });
  }
  
}
