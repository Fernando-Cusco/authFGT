import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}



/*
Instalacion paquetes facebook

ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="695087810980695" --variable APP_NAME="Timeout"


npm install @ionic-native/facebook
*/