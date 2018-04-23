import { RestProvider } from './../providers/rest';
import { SharedProvider } from './../providers/shared';
import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, App } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/petani/tabs-petani/tabs';
import { TabsMasyarakatPage } from '../pages/masyarakat/tabs-masyarakat/tabs-masyarakat';
import { TabsPedagangPage } from '../pages/pedagang/tabs-pedagang/tabs-pedagang';
import { TabsPenyuluhPage } from '../pages/penyuluh/tabs-penyuluh/tabs-penyuluh';
import { UserData } from '../providers/user-data';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
  providers: [SharedProvider]
})

export class MyApp {
  rootPage  : any;

  @ViewChild(Nav) navChild:Nav;

  menuApps : any[] = [
    {
      name: 'Portal Harga',
      page: 'PortalHargaPage',
      icon: 'pricetag',
      params: { type: 'all', name: 'portalHarga' }
    },
    {
      name: 'Pengetahuan',
      page: 'PengetahuanPage',
      icon: 'book',      
      params: { type: 'all', name: 'Pengetahuan'}
    }
  ];  

  menuAccount  : any[] = [
    {
      name: 'Notifikasi',
      page: 'NotifikasiPage',
      icon: 'notifications',      
      params: { type: 'all', name: 'Notifikasi'}
    },
    { 
      name: 'Pengumuman',
      page: 'PengumumanPage',
      icon: 'information-circle',      
      params: { type: 'all', name: 'Pengumuman'}
    },    
    {
      name: 'Keluar',
      page: LoginPage,
      icon: 'log-out',      
      params: { type: 'all', name: 'Keluar'}
    }
  ];
  
  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public app: App,
    public userData: UserData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if(hasLoggedIn) {
        this.userData.getKomoditasFromServer();
        this.userData.getRole().then((value)=>{
        this.navChild.setRoot('PortalHargaPage')
        });
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  openPage(page) {
    console.log('root sebelum', this.navChild.getActive().name);
    let currentRoot = this.navChild.getActive().name;

    if(currentRoot && currentRoot === page.page){
      console.log('same root!');
    }
    else{
      this.navChild.setRoot(page.page, page.params)
      console.log('root sekarang', this.navChild.getActive().name)
    }

  }
  isActive(page){
    if (this.navChild.getActive() && this.navChild.getActive().name === page.page) {
      return 'primary';
    }
    return;
  }

  logout() {
    this.userData.logout();
    this.app.getRootNav()[0].setRoot(LoginPage);
  }
}
