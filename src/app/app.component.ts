import { Component,ViewChild } from '@angular/core';
import { Platform,Nav, App } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/petani/tabs-petani/tabs';
import { TabsMasyarakatPage } from '../pages/masyarakat/tabs-masyarakat/tabs-masyarakat';
import { TabsPedagangPage } from '../pages/pedagang/tabs-pedagang/tabs-pedagang';
import { TabsPenyuluhPage } from '../pages/penyuluh/tabs-penyuluh/tabs-penyuluh';
import { UserData } from '../providers/user-data';
import { LoginPage } from '../pages/login/login';
// import { Deeplinks } from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any;

  @ViewChild(Nav) navChild:Nav;
  menuItems: any[] = [
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
    },
    {
      name: 'Jual Beli',
      page: '',
      icon: 'document',      
      params: { type: 'all', name: 'Berbagi File'}
    },
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
    public app: App,
    public userData: UserData) {
    platform.ready().then(() => {
      Splashscreen.hide();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString("#333");
      // StatusBar.styleDefault();
    // StatusBar.overlaysWebView(true);
    // StatusBar.backgroundColorByHexString('#ffffff'); // set status bar to white
    
    //  Deeplinks.routeWithNavController(this.navChild, {
    //     '/login': LoginPage
    //   }).subscribe((match) => {
    //     // alert('Successfully routed'+ match);
    //   }, (nomatch) => {
    //     // console.warn('Unmatched Route', nomatch);
    //   });
    
    });

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if(hasLoggedIn) {
        this.userData.getKomoditasFromServer();
        this.userData.getRole().then((value)=>{
        this.navChild.setRoot('PortalHargaPage')
          // switch (value) {
          //   case 3:
          //    this.rootPage = TabsPenyuluhPage;
          //     break;
          //   case 4:
          //    this.rootPage = TabsPage;
          //     break;
          //   case 5:
          //     this.rootPage = TabsMasyarakatPage;
          //     break;
          //   case 6:
          //     this.rootPage = TabsPedagangPage;
          //     break;
          //   default:
          //   // code...
          //   break;
          // }
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

  logout() {
    this.userData.logout();
    this.app.getRootNav()[0].setRoot(LoginPage);
   // this.nav.setRoot(LoginPage);
  }
}
