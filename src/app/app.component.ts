import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/petani/tabs-petani/tabs';
import { TabsMasyarakatPage } from '../pages/masyarakat/tabs-masyarakat/tabs-masyarakat';
import { UserData } from '../providers/user-data';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    public userData: UserData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
    StatusBar.overlaysWebView(true);
    StatusBar.backgroundColorByHexString('#ffffff'); // set status bar to white
      Splashscreen.hide();
    });

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if(hasLoggedIn) {
        this.userData.getRole().then((value)=>{
          switch (value) {
            case 4:
             this.rootPage = TabsPage;
              break;
            case 5:
              this.rootPage = TabsMasyarakatPage;
              break;
            default:
            // code...
            break;
          }
          console.log(value);
        });
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}
