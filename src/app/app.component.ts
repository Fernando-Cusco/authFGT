import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

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

  userGoogle = {
    displayName: null,
    email: null,
    givenName: null,
    imageUrl: null,
    isLogged: false
  };

  userTwitter = {
    name: null,
    userName: null,
    picture: null,
    email: null,
    isLogged: false
  };

  constructor( private platform: Platform,
               private splashScreen: SplashScreen,
               private statusBar: StatusBar,
               private facebook: Facebook,
               private google: GooglePlus,
               private twitter: AngularFireAuth) {
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
      console.log('Auth Facebook ', response);
      this.facebook.api('me?fields=id,name,email,picture.width(720).as(picture_large)', []).then(profile => {
        console.log('Auth Facebook ', profile);
        this.userData = {
          email: profile.email,
          picture: profile.picture_large['data'].url,
          username: profile.name,
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



  authGoogle() {
    this.google.login({}).then(res => {
      this.userGoogle = {
        displayName: res.displayName,
        email: res.email,
        givenName: res.givenName,
        imageUrl: res.imageUrl,
        isLogged: true
      };
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
  }


  exitGoogle() {
    this.google.logout().then((res) => {
      console.log('Logout Google ', res);
      this.userGoogle.isLogged = false;
    }).catch((err) => {
      console.log(err);
    });
  }


  authTwitter() {
    this.twitter.auth.signInWithPopup(new auth.TwitterAuthProvider()).then( response => {
      console.log(response);
      this.userTwitter = {
        name: response.user.displayName,
        userName: response.user.displayName,
        picture: response.user.photoURL,
        email: response.user.email,
        isLogged: true
      };
    }).catch((error) => {
      console.log('Error: ', error);
    });
  }

  exitTwitter() {
    this.twitter.auth.signOut().then( response => {
      console.log('Cerrando Sesion');
    }).catch( (error) => {
      console.log('Error', error);
    });
  }


}


/*
Instalacion paquetes facebook
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="695087810980695" --variable APP_NAME="Timeout"
npm install @ionic-native/facebook
*/


/*
Instalacion paquetes Google
ionic cordova plugin add cordova-plugin-googleplus --variable
REVERSED_CLIENT_ID=208511631300-83nt5jkblvrj2d45o89po6e85pour549.apps.googleusercontent.com

npm install @ionic-native/google-plus

*/

/*
Instalacion paquetes Twiter
cordova plugin add https://github.com/chroa/twitter-connect-plugin --variable FABRIC_KEY=AIzaSyD2kFPzdjiBiwUDFKQngg-SVOY6yAo9W2w --variable TWITTER_KEY=tCKEVo3x8iB4RidhBXOd5ES1W --variable TWITTER_SECRET=HERHN3wzh7TYeH7b8IQnOX6c4bL7BFi6kLJFfjbNzHo0KlB0NL

ionic cordova plugin add twitter-connect-plugin
npm install @ionic-native/twitter-connect

npm install angularfire2 firebase --save
npm install firebase @angular/fire --save


ionic cordova plugin add twitter-connect-plugin
npm install @ionic-native/twitter-connect
*/
