import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  userData = {
    email: null,
    picture: null,
    username: null,
    isLogged: false
  };

  constructor( private platform: Platform,
               private splashScreen: SplashScreen,
               private statusBar: StatusBar,
               private facebook: Facebook) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  authFacebook() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,picture.width(720).as(picture_large)', []).then(profile => {
        this.userData = {
          email: profile['email'],
          picture: profile['picture_large']['data']['url'],
          username: profile['name'],
          isLogged: true
        };
      });
    });
  }

  exitFacebook() {
    this.facebook.logout().then(response => {
      console.log('Estado: ', response);
      this.userData.isLogged = false;
    }).catch(error => {
      console.log('Error: ', error);

    });
  }











}


/*
Instalacion paquetes facebook
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="695087810980695" --variable APP_NAME="Timeout"
npm install @ionic-native/facebook
*/