import { SharedProvider } from './../providers/shared';
import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, App } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Keyboard } from '@ionic-native/keyboard';
import { UserData } from '../providers/user-data';

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
  ];
  
  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public deeplinks: Deeplinks,
    public app: App,
    public userData: UserData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if(hasLoggedIn) {
        this.userData.getKomoditasFromServer();
        this.userData.getRole().then((value)=>{
        this.navChild.setRoot('PortalHargaPage')
        this.deeplink();
        });
      } else {
        this.rootPage = 'LoginPage';
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
    this.app.getRootNav().setRoot('LoginPage');
  }
  deeplink(){
    // deeeplinking for link to page from external URI. put it here to make sure user has already login
    this.deeplinks.routeWithNavController(this.navChild, {
      ':3000/': 'PengetahuanPage',
      ':3000/api/artikel/post/:id' :  'ArtikelPreviewPage',
      ':3000/api/materi/topik/:id': 'BerbagiFilePreviewPage',
      ':3000/api/diskusi/tanya/:idPertanyaan': 'ForumPreviewPage'
    }).subscribe( match =>{
      console.log('match bro')
      // alert(JSON.stringify(match))
    }, nomatch =>{
      alert(JSON.stringify(nomatch));
    })
  }
}
